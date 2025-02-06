using Microsoft.AspNetCore.Mvc;
using ParkingAPI.Services;
using ParkingAPI.Data;
using ParkingAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ParkingAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VehiculoController : ControllerBase
    {
        private readonly ParkingDbContext _context;
        private readonly VehiculoService _vehiculoService;

        public VehiculoController(ParkingDbContext context, VehiculoService vehiculoService)
        {
            _context = context;
            _vehiculoService = vehiculoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehiculo>>> GetVehiculos()
        {
            return await _context.Vehiculos.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Vehiculo>> PostVehiculo(Vehiculo vehiculo)
        {
            _context.Vehiculos.Add(vehiculo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetVehiculos), new { id = vehiculo.Id }, vehiculo);
        }

        [HttpGet("filtrar-por-fecha")]
        public async Task<ActionResult<IEnumerable<VehiculoDTO>>> ObtenerVehiculosPorRangoDeTiempo(
    [FromQuery] DateTime fechaInicio,
    [FromQuery] DateTime fechaFin)
        {
            if (fechaInicio > fechaFin)
            {
                return BadRequest("La fecha de inicio no puede ser mayor a la fecha de fin.");
            }

            var vehiculos = await _context.Vehiculos
                .Where(v => v.HoraIngreso >= fechaInicio && v.HoraIngreso <= fechaFin)
                .Select(v => new VehiculoDTO
                {
                    Placa = v.Placa,
                    Tipo = v.Tipo,
                    TiempoParqueo = v.HoraSalida.HasValue
                        ? (v.HoraSalida.Value - v.HoraIngreso).TotalMinutes
                        : (DateTime.UtcNow - v.HoraIngreso).TotalMinutes,
                    ValorPagado = v.ValorPagado ?? 0
                })
                .ToListAsync();

            return Ok(vehiculos);
        }

        [HttpPost("calcular-salida/{id}")]
        public async Task<IActionResult> CalcularSalida(int id, [FromBody] SalidaRequest request)
        {
            try
            {
                var totalPagar = await _vehiculoService.CalcularSalidaVehiculo(id, request.NumeroFactura);
                return Ok(new { mensaje = "Salida registrada con éxito", totalPagar });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

        public class SalidaRequest
        {
            public string? NumeroFactura { get; set; }
        }
    }
}
