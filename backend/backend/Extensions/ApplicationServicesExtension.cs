using Amazon;
using Amazon.S3;
using AutoMapper;
using backend.Core;
using backend.Data;
using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000");
                });
            });

            var mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            }).CreateMapper();
            services.AddSingleton(mapper);

            services.AddSignalR();

            services.AddSingleton<IAmazonS3>(_=> new AmazonS3Client(config.GetValue<string>("AWSCredentials:AccessKeyID"), config.GetValue<string>("AWSCredentials:SecretAccessKey"), RegionEndpoint.CACentral1));

            services.AddSingleton<IUploadFile>(provider=> new S3BucketService(provider.GetRequiredService<IAmazonS3>(), provider.GetRequiredService<ILogger<S3BucketService>>()));

            return services;
        }
    }
}
