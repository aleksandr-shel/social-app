using backend.Data;
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


            services.AddSignalR();
            return services;
        }
    }
}
