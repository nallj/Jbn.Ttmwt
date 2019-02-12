using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Jbn.Ttmwt.WebServices.Features.Device
{
    [Route("api/[controller]")]
    public class DevicesController : Controller
    {
        [HttpGet]
        public IEnumerable<string> GetExistingDevices([FromServices] IDeviceService devSvc)
        {
            return devSvc.GetExistingDevices();
        }
    }
}