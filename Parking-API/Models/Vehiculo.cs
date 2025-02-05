using System.ComponentModel.DataAnnotations;


namespace ParkingAPI.Models
{
    public class Vehiculo
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "La placa es obligatoria")]
        [StringLength(6, ErrorMessage = "La placa no puede tener más de 10 caracteres")] 
        public string Placa { get; set; }

        [Required(ErrorMessage = "El tipo de vehículo es obligatorio")]
        [RegularExpression("^(Carro|Moto|Bicicleta)$", ErrorMessage = "El tipo de vehículo debe ser Carro, Moto o Bicicleta")]
        public string Tipo { get; set; }
        
        [Required]
        public DateTime HoraIngreso { get; set; }
        public DateTime? HoraSalida { get; set; }
        public decimal? ValorPagado { get; set; }
        public string? NumeroFacturaSupermercado { get; set; } 
    }
}
    