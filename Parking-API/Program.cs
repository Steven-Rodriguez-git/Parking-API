using Microsoft.EntityFrameworkCore;
using ParkingAPI.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ParkingDbContext>(options =>
    options.UseSqlServer(
        Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING")
    ));

builder.Services.AddEndpointsApiExplorer();
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

builder.Services.AddOpenApi();
builder.Services.AddControllers();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ParkingAPI v1"));
}



app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

