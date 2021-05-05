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
            await AddDeliveryTypes(context);
            await AddCustomers(context);
            await AddDeliveries(context);
            await AddOrders(context);
            await AddProductOrders(context);

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

         private static async Task AddDeliveryTypes(DataContext context)
         {
            if(await context.DeliveryTypes.AnyAsync()) return;
           
            List<DeliveryType> deliveryTypes = new List<DeliveryType>()
            {
              new DeliveryType{ Name = "Poczta Polska", Price = 7.5F },
              new DeliveryType{ Name = "DPD",  Price = 13  },
              new DeliveryType{ Name = "FedEx" , Price = 10 },
            };

            context.DeliveryTypes.AddRange(deliveryTypes); 
            await context.SaveChangesAsync();
        }

         private static async Task AddCustomers(DataContext context)
         {
            if(await context.Customers.AnyAsync()) return;
           
            List<Customer> customers = new List<Customer>()
            {
              new Customer{ 
                Mail = "jan.nowak@wp.pl",
                NIP = "0123456789",
                Phone = "+48 667 233 455",
                Address = new Address {
                  City = "Kraków",
                  Name = "Jan Nowak",
                  PostalCode = "30-063",
                  Street = "Raciborska 12"
                },
                ShipAddress = new Address {
                  City = "Katowice",
                  Name = "Jan Nowak",
                  PostalCode = "40-001",
                  Street = "Chorzowska 15"
                }
               },
            };

            context.Customers.AddRange(customers); 
            await context.SaveChangesAsync();
        }
         private static async Task AddDeliveries(DataContext context)
         {
            if(await context.Deliveries.AnyAsync()) return;
           
            List<Delivery> deliveries = new List<Delivery>()
            {
              new Delivery() {
                COD = false,
                ConsignmentNoteNumber = "ASD/12434",
                CreatedAt = DateTime.Now.AddHours(10),
                DeliveryTypeId = 1,
                InsuranceAmount = 1000,
                Insured = true
              }
            };

            context.Deliveries.AddRange(deliveries); 
            await context.SaveChangesAsync();
        }

         private static async Task AddOrders(DataContext context)
         {
            if(await context.Orders.AnyAsync()) return;
           
            List<Order> orders = new List<Order>()
            {
              new Order() {
               CreatedAt = DateTime.Now,
               CustomerId = 1,
               DeliveryId = 1,
               DeliveryPrice = (await context.DeliveryTypes.FindAsync(1)).Price,
               ShippingAddressSameAsCustomer = true,
               Status = OrderStatus.Send
              }
            };

            context.Orders.AddRange(orders); 
            await context.SaveChangesAsync();
        }

         private static async Task AddProductOrders(DataContext context)
         {
            if(await context.ProductOrders.AnyAsync()) return;
           
            List<ProductOrders> productOrders = new List<ProductOrders>()
            {
              new ProductOrders() {
                 OrderId = 1,
                 ProductId = 1,
                 GrossPrice = 3149,
                 VAT = 23,
                 Quantity = 2,

              }
            };

            context.ProductOrders.AddRange(productOrders); 
            await context.SaveChangesAsync();
        }
    }
}