using Business;
using Data;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
  public class SucursalController : ControllerBase
  {
    private SucursalManager? sucursalManager;
    private MonedaManager monedaManager;
    private string _constring;
    public SucursalController() {
      _constring = Config.GetConString();
      sucursalManager = new SucursalManager(_constring);
      monedaManager = new MonedaManager(_constring);
    }
    [Route("api/Sucursal/GetSucursal")]
    [HttpGet]
    public async Task<IActionResult> GetSucursal([FromBody] Sucursal sucursal)
    {
      try
      {
        Sucursal? sucursalData = await Task.Run(() => sucursalManager.GetSucursal(sucursal).Result.FirstOrDefault());
        if (sucursalData == null)
        {
          return BadRequest(new { message = "No se encuentra Sucursal" });
        }
        return Ok(sucursalData);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
    [Route("api/Sucursal/GetSucursales")]
    [HttpGet]
    public async Task<IActionResult> GetSucursales()
    {
      try
      {
        List<Sucursal?> sucursalData = await Task.Run(() => sucursalManager.GetSucursal(new Sucursal()).Result.ToList());
        if (sucursalData == null)
        {
          return BadRequest(new { message = "No se encuentra Sucursal" });
        }
        return Ok(sucursalData);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }
    }
    [Route("api/Sucursal/UpdateSucursal")]
    [HttpPut]
    public async Task<IActionResult> UpdateSucursal([FromBody] Sucursal sucursal)
    {
      try
      {
        await Task.Run(() => sucursalManager.UpdateSucursal(sucursal));
        return Ok();
      }
      catch (Exception ex)
      {

        return BadRequest(ex.Message);
      }
    }
    [Route("api/Sucursal/InsertSucursal")]
    [HttpPost]
    public async Task<IActionResult> InsertSucursal([FromBody] Sucursal sucursal)
    {
      try
      {
        int? idSucursal = await Task.Run(() => sucursalManager.InsertSucursal(sucursal));
        return Ok(new { idSucursal = idSucursal });
      }
      catch (Exception ex)
      {

        return BadRequest(ex.Message);
      }
    }
    [Route("api/Sucursal/GetMoneda")]
    [HttpPut]
    public async Task<IActionResult> GetMoneda([FromBody] Moneda moneda)
    {
      try
      {
        List<Moneda>? dato = await Task.Run(() => monedaManager.GetMoneda(new Moneda()));
        return Ok(dato);
      }
      catch (Exception ex)
      {

        return BadRequest(ex.Message);
      }
    }

  }
}
