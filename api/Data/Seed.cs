using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(await context.Users.AnyAsync()) return;

            AppUser user = new AppUser 
            {
              Login = "admin"
            };

            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("admin"));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user); 
            await context.SaveChangesAsync();
        }
    }
}