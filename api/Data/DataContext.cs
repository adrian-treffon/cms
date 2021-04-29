using Microsoft.EntityFrameworkCore;
using api.Entities;

namespace api.Data
{
  public class DataContext : DbContext
  {
    public DbSet<AppUser> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<ProductType> ProductTypes { get; set; }
    public DbSet<Producer> Producers { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<DeliveryType> DeliveryTypes { get; set; }
    public DbSet<Delivery> Deliveries { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<ProductOrders> ProductOrders { get; set; }
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    { 
       modelBuilder.Entity<ProductOrders>()
            .HasKey(productOrders => new { productOrders.ProductId, productOrders.OrderId });  
    }
  }
}