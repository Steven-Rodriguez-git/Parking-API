using Microsoft.EntityFrameworkCore;
using ParkingAPI.Data;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var key = Environment.GetEnvironmentVariable("JWT_KEY") ?? throw new InvalidOperationException("JWT_KEY no está configurado");
var issuer = builder.Configuration["Jwt:Issuer"];
var audience = builder.Configuration["Jwt:Audience"];
var app = builder.Build();
    

builder.Services.AddDbContext<ParkingDbContext>(options =>
    options.UseSqlServer(
        Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")
    ));

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ParkingAPI",
        Version = "v1",
        Description = "API para la gestión del parqueadero de Don José",
        Contact = new OpenApiContact
        {
            Name = "Tu Nombre",
            Email = "tuemail@ejemplo.com"
        }
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddOpenApi();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ParkingAPI v1"));
}

app.UseMiddleware<ControlMiddleware>();
app.UseAuthentication(); 
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

