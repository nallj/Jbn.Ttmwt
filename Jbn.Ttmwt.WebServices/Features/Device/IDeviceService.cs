using System.Collections.Generic;

namespace Jbn.Ttmwt.WebServices.Features.Device
{
    public interface IDeviceService
    {
        IEnumerable<string> GetExistingDevices();
    }
}
