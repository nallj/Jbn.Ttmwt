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

using Jbn.Ttmwt.WebServices.Features.Device;
using Jbn.Ttmwt.WebServices.Features.Patient;
using Jbn.Ttmwt.WebServices.Features.Proctor;
using Jbn.Ttmwt.WebServices.Features.Records;
using Jbn.Ttmwt.WebServices.Features.Tests;
using Jbn.Ttmwt.WebServices.Infrastructure.Mappings;

namespace Jbn.Ttmwt.WebServices
{
    public class Startup
    {

        private const string corsPolicyKey = "CorsPolicy";

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

            Mapper.Initialize(config =>
            {
                config.AddProfiles(new Type[] {
                        typeof(DalToModel),
                        typeof(ModelToDal)
                    });
            });

            // Cross-Origin Resource Sharing (CORS)
            var appOrigin = Configuration.GetValue<string>("AppOrigin");
            services.AddCors(options =>
            {
                options.AddPolicy(corsPolicyKey, builder =>
                    builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin());
                        //.WithOrigins(new string[] { appOrigin }));
            });



            // Database Context
            var appDbConnString = Configuration.GetConnectionString("AppDbContext");
            services
                .AddDbContext<DAL.AppDbContext>(options =>
                {
                    options.UseSqlServer(appDbConnString);
                    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
                });

            // Swashbuckle
            services.AddSwaggerGen(c =>
                c.SwaggerDoc("v0", new Info() { Version = "v0", Title = "Jbn.Ttmwt.WebServices v0" })
            );

            // Application services.
            services
                .AddScoped<IDeviceService, DeviceService>()
                .AddScoped<IPatientService, PatientService>()
                .AddScoped<IProctorService, ProctorService>()
                .AddScoped<IRecordService, RecordService>()
                .AddScoped<ITestService, TestService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(corsPolicyKey);
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
