using api.Database.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations;

public class PortfolioConfiguration : IEntityTypeConfiguration<Portfolio>
{
    public void Configure(EntityTypeBuilder<Portfolio> builder)
    {
        builder.HasKey(p => p.Id);
        builder.HasIndex(p => p.UserId);
        
        builder.Property(p => p.PortfolioName)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(p => p.Description).HasMaxLength(250);
        
        builder.HasOne(p => p.AppUser)
            .WithMany(p => p.Portfolios)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}