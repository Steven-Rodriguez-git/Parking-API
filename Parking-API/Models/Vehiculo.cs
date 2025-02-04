using System;

namespace ParkingAPI.Models
{
    public class Vehiculo
    {
        public int Id { get; set; }
        public string Placa { get; set; }
        public string Tipo { get; set; } 
        public DateTime HoraIngreso { get; set; }
        public DateTime? HoraSalida { get; set; }
        public decimal? ValorPagado { get; set; }
        public string? NumeroFacturaSupermercado { get; set; } 
    }
}
