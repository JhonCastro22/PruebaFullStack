using Microsoft.AspNetCore.Mvc;

namespace AdministracionRiesgos.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DefaultController : ControllerBase
  {
    [HttpGet]
    public string Get()
    {
      return "Aplicacion Corriendo";
    }
  }
}
