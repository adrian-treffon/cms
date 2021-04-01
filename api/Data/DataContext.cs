using Microsoft.EntityFrameworkCore;
using api.Entities;

namespace api.Data
{
  public class DataContext : DbContext
  {
    public DbSet<AppUser> Users { get; set; }
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    { 
    }
  }
}