using System;
using System.Threading.Tasks;
using ParkingAPI.Models;
using ParkingAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace ParkingAPI.Services
{
    public class VehiculoService
    {
        private readonly ParkingDbContext _context;

        public VehiculoService(ParkingDbContext context)
        {
            _context = context;
        }

        public async Task<decimal> CalcularSalidaVehiculo(int vehiculoId, string? numeroFactura)
        {
            var vehiculo = await _context.Vehiculos.FindAsync(vehiculoId);
            if (vehiculo == null)
                throw new Exception("Vehículo no encontrado.");

            if (vehiculo.HoraSalida != null)
                throw new Exception("El vehículo ya ha salido del parqueadero.");

            vehiculo.HoraSalida = DateTime.UtcNow;
            var tiempoEnMinutos = (vehiculo.HoraSalida.Value - vehiculo.HoraIngreso).TotalMinutes;
            if (tiempoEnMinutos < 1) tiempoEnMinutos = 1; 


            decimal tarifaPorMinuto = vehiculo.Tipo.ToLower() switch
            {
                "carro" => 110,
                "moto" => 50,
                "bicicleta" => 10,
                _ => throw new Exception("Tipo de vehículo no válido.")
            };

            decimal totalPagar = (decimal)tiempoEnMinutos * tarifaPorMinuto;

            if (!string.IsNullOrEmpty(numeroFactura))
            {
                totalPagar *= 0.7m; 
                vehiculo.NumeroFacturaSupermercado = numeroFactura;
            }

            vehiculo.ValorPagado = totalPagar;

            await _context.SaveChangesAsync();

            return totalPagar;
        }
    }
}
