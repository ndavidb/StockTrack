using api.Database.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Database.Configurations;

public class PortfolioConfiguration : IEntityTypeConfiguration<Portfolio>
{
    public void Configure(EntityTypeBuilder<Portfolio> builder)
    {
        builder.HasKey(p => p.Id);

        builder.HasIndex(p => p.AppUserId);

        builder.HasKey(p => new { p.AppUserId, p.StockId });

        builder.HasOne(p => p.Stock)
            .WithMany(s => s.Portfolios)
            .HasForeignKey(p => p.StockId)
            .IsRequired();

        builder.HasOne(p => p.AppUser)
            .WithMany()
            .HasForeignKey(p => p.AppUserId)
            .IsRequired();

    }
}