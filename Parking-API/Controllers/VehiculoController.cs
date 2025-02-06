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
