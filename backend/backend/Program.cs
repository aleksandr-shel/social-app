using backend.Data;
using backend.Extensions;
using backend.Middleware;
using backend.Models;
using backend.RealTime.Messages;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
Console.WriteLine($"Environment: {builder.Environment.EnvironmentName}");
var config = builder.Configuration;

// Add services to the container.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices(config);
builder.Services.AddIdentityServices(config);

builder.Services.AddControllers(opt =>
{
    //added authorization, so only authenticated users can access 
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

var app = builder.Build();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseXContentTypeOptions();

app.UseReferrerPolicy(opt => opt.NoReferrer());

app.UseXXssProtection(opt => opt.EnabledWithBlockMode());

app.UseXfo(opt => opt.Deny());

app.UseCsp(opt =>
    opt.BlockAllMixedContent()
    .StyleSources(s => s.Self().CustomSources("sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=", "sha256-lmto2U1o7YINyHPg9TOCjIt+o5pSFNU/T2oLxDPF+uw=", "https://accounts.google.com/gsi/style"))
    .FontSources(s =>s.Self())
    .FormActions(s => s.Self())
    .FrameAncestors(s => s.Self())
    .ImageSources(s => s.Self().CustomSources("https://shared-bucket-aleksandr.s3.ca-central-1.amazonaws.com/", "data:"))
    .ScriptSources(s => s.Self().CustomSources("https://accounts.google.com/gsi/client")   )
);

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");


//adds check for authorization header
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapHub<MessagesHub>("/messages");

app.UseDefaultFiles();
app.UseStaticFiles();


app.MapFallbackToController("Index", "Fallback");

app.Run();
