using api.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations;

public class StockConfiguration : IEntityTypeConfiguration<Stock>
{
    public void Configure(EntityTypeBuilder<Stock> builder)
    {
        builder.HasKey(s => s.Id);

        builder.Property(s => s.Symbol)
            .IsRequired()
            .HasMaxLength(5);
        
        builder.Property(s => s.CompanyName)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(s => s.Industry)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.HasIndex(s => s.Symbol).IsUnique();
        builder.HasIndex(s => s.CompanyName);

        builder.HasMany(s => s.StockPrices)
            .WithOne(sp => sp.Stock)
            .HasForeignKey(sp => sp.StockId);
    }
}