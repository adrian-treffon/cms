using System;
using System.Collections.Generic;
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
            await AddAdmin(context);
            await AddCategories(context);
            await AddProducers(context);
            await AddProductTypes(context);
            await AddProducts(context);
        }

        private static async Task AddAdmin(DataContext context)
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
         private static async Task AddProducers(DataContext context)
        {
            if(await context.Producers.AnyAsync()) return;

            List<Producer> producers = new List<Producer>()
            {
              new Producer{ Name = "Xiaomi", IsActive = true },
              new Producer{ Name = "Apple" , IsActive = true},
              new Producer{ Name = "Nokia", IsActive = true },
            };

            context.Producers.AddRange(producers); 
            await context.SaveChangesAsync();
        }

        private static async Task AddCategories(DataContext context)
        {
            if(await context.Categories.AnyAsync()) return;

            List<Category> categories = new List<Category>()
            {
              new Category{ Name = "Smartfony", IsActive = true },
              new Category{ Name = "Akcesoria GSM", IsActive = true },
              new Category{ Name = "Elektronika", IsActive = true },
            };

            context.Categories.AddRange(categories); 
            await context.SaveChangesAsync();
        }

        private static async Task AddProductTypes(DataContext context)
        {
            if(await context.ProductTypes.AnyAsync()) return;
           
            List<ProductType> productTypes = new List<ProductType>()
            {
              new ProductType{ Name = "Smartfon", Parameters="Przekątna ekranu;Pojemność baterii", IsActive = true },
              new ProductType{ Name = "Ładowarka", Parameters="Moc;Kolor", IsActive = true },
              new ProductType{ Name = "Etui" , Parameters="Kolor;Model", IsActive = true },
            };

            context.ProductTypes.AddRange(productTypes); 
            await context.SaveChangesAsync();
        }

        private static async Task AddProducts(DataContext context)
        {
            if(await context.Products.AnyAsync()) return;
           
            List<Product> products = new List<Product>()
            {
              new Product{ 
                Name = "IPhone 11", 
                Parameters="Przekątna ekranu:6.10\";Pojemność baterii:3110 mAh",
                Availability = 12,
                AvailabilityMessage = "Produkt dostępny od ręki",
                AvailabilityUnit = "szt.",
                CategoryId = 1,
                Description = "Solidny telefon komórkowy",
                EAN = "190199221116",
                GrossPrice = 3149,
                CreatedAt = DateTime.Now,
                ModifiedAt = DateTime.Now,
                NotAvailableMessage = "Produkt niedostępny",
                ProducerId = 2,
                IsActive = true,
                VAT = 23,
                TypeId = (await context.ProductTypes.FirstAsync(x => x.Name == "Smartfon")).Id,
                SKU = "6341304",
                LeadTime = "1 dzień roboczy",
              },
            };

            context.Products.AddRange(products); 
            await context.SaveChangesAsync();
        }
    }
}