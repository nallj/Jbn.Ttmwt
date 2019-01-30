using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Jbn.TimedTenMeterWalkTest.WebServices
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
            services
                .AddAutoMapper()
                .AddMvc();

            //Mapper.Initialize(config =>
            //{
            //    config.AddProfiles(new Type[] {
            //            typeof(aMappings)
            //        });
            //});

            // Cross-Origin Resource Sharing (CORS)
            var appOrigin = Configuration.GetValue<string>("AppOrigin");
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                    builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins(new string[] { appOrigin }));
            });



            // Database Context
            var appDbConnString = Configuration.GetConnectionString("AppDbContext");
            //services
            //    .AddDbContext<DAL.AppDbContext>(options =>
            //    {
            //        options.UseSqlServer(appDbConnString);
            //        options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            //    });

            // Swashbuckle
            services.AddSwaggerGen(c =>
                c.SwaggerDoc("v0", new Info() { Version = "v0", Title = "Jbn.Ttmwt.WebServices v0" })
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");
            app.UseStaticFiles();
            app.UseMvc();

            if (env.IsDevelopment())
            {
                app.UseSwagger();

                // Need this to make use of the Swagger UI <http://localhost:55214/swagger/>.
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v0/swagger.json", "WebServices Specification");
                });
            }
        }
    }
}
