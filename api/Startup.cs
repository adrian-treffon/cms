using System.Text;
using api.Data;
using api.Helpers;
using api.Intefaces;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace cms
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(opt =>
              {
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
              });
            services.AddCors(options => options.AddPolicy("CorsPolicy", builder =>
              {
                  builder
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .WithOrigins("http://localhost:4200")
                      .AllowCredentials();
              }));
              services.AddControllers();
              services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt => {
                  opt.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"])),
                      ValidateIssuer = false,
                      ValidateAudience = false
                  };
              });
              services.AddSwaggerGen(c =>
              {
                  c.SwaggerDoc("v1", new OpenApiInfo { Title = "cms", Version = "v1" });
              });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "cms v1"));
            }

            app.UseCors("CorsPolicy");
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
