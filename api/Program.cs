using api.Common.Exceptions;
using api.Common.Extensions;
using api.Database;
using api.Database.Models;
using api.Features.Portfolios.AddStockToPortfolio;
using api.Features.Portfolios.CreatePortfolio;
using api.Features.Portfolios.DeletePortfolio;
using api.Features.Portfolios.GetPortfolio;
using api.Features.Portfolios.GetPortfolios;
using api.Features.Portfolios.UpdatePortfolio;
using api.Features.Stocks.CreateStock;
using ErrorOr;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);


// Authentication and Authorization
builder.Services.AddAuthorization();
builder.Services.AddMemoryCache();
// Exception
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Services
builder.Services.AddOpenApi();
builder.Services.AddScoped<CreatePortfolioHandler>();
builder.Services.AddScoped<GetPortfolioHandler>();
builder.Services.AddScoped<UpdatePortfolioHandler>();
builder.Services.AddScoped<GetPortfoliosHandler>();
builder.Services.AddScoped<DeletePortfolioHandler>();
builder.Services.AddScoped<CreateStockHandler>();
builder.Services.AddScoped<AddStockToPortfolioHandler>();

// Libraries
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();
builder.Services.ToErrorOr();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy
            .WithOrigins("http://localhost:3000")
            .WithOrigins("http://localhost:5103")
            .AllowAnyMethod()
            .AllowCredentials()
            .AllowAnyHeader());

});


// Database
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));

});

// Identity endpoints/
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<AppDbContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(options =>
    {
        options.Title = "Identity Tutorial API Reference";
        options.DefaultHttpClient = new(ScalarTarget.JavaScript, ScalarClient.Fetch);
    });

}

app.UseExceptionHandler();

app.UseRouting();

app.UseCors("AllowAll");


app.UseAuthentication();
app.UseAuthorization();


app.MapIdentityApi<AppUser>();
app.MapEndpoints();

app.UseHttpsRedirection();

app.Run();