﻿using Amazon;
using Amazon.S3;
using AutoMapper;
using backend.Core;
using backend.Data;
using backend.Resolvers;
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
                opt.UseMySql(config.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(config.GetConnectionString("defaultConnection")));
                //opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
                //opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                //opt.UseMySql(config.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(config.GetConnectionString("DefaultConnection")));
                //opt.UseMySql(Helper.Helper.GetRDSConnectionString(), ServerVersion.AutoDetect(Helper.Helper.GetRDSConnectionString()));
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

            //it adds Automapper manually
            //var mapperConfig = new MapperConfiguration(cfg=>
            //{
            //    cfg.AddProfile(new MappingProfile());
            //});
            //var mapper = mapperConfig.CreateMapper();
            //services.AddSingleton(mapper);

            services.AddAutoMapper(typeof(MappingProfile));

            services.AddSignalR();
            services.AddScoped<EmailSender>();
            //services.AddSingleton<IAmazonS3>(_ => new AmazonS3Client(Helper.Helper.GetAWSAccessKey(), Helper.Helper.GetAWSSecretKey(), RegionEndpoint.CACentral1));
            services.AddSingleton<IAmazonS3>(_ => new AmazonS3Client(config.GetValue<string>("AWSCredentials:AccessKeyID"), config.GetValue<string>("AWSCredentials:SecretAccessKey"), RegionEndpoint.CACentral1));

            services.AddSingleton<IUploadFile>(provider=> new S3BucketService(provider.GetRequiredService<IAmazonS3>(), provider.GetRequiredService<ILogger<S3BucketService>>()));
            services.AddSingleton<IGeneratePresignedUrl>(provider=> new S3BucketService(provider.GetRequiredService<IAmazonS3>(), provider.GetRequiredService<ILogger<S3BucketService>>()));
            services.AddScoped<AppUserImageResolver>();
            services.AddScoped<ImageProfileImageResolver>();
            services.AddScoped<PostDocResolver>();
            services.AddScoped<PostImageResolver>();
            return services;
        }
    }
}
