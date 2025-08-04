using ententeeWarehouse.Middleware;
using ententeeWarehouse.Model;
using ententeeWarehouse.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthentication("jwt")
    .AddScheme<JwtAuthHandlerOptions, JwtAuthHandler>("jwt", _ => { });
builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder("jwt")
        .RequireAuthenticatedUser()
        .Build();
});
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Listen(System.Net.IPAddress.Loopback, 5000);
});

builder.Services.AddDbContext<WarehouseDbContext>();

builder.Services.AddTransient<ItemService>();
builder.Services.AddTransient<AuthService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<WarehouseDbContext>();

    dbContext.Database.Migrate();
}

app.UseCors(policy =>
{
    if (app.Environment.IsDevelopment())
        policy.WithOrigins("http://localhost:3000");

    policy.AllowAnyMethod();
    policy.AllowAnyHeader();
});

app.UsePathBase("/api");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers()
    .RequireAuthorization();

app.Run();