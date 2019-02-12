using System.Collections.Generic;
using System.Linq;

using Jbn.Ttmwt.DAL;

namespace Jbn.Ttmwt.WebServices.Features.Device
{
    public class DeviceService : IDeviceService
    {
        private readonly AppDbContext dbContext;

        public DeviceService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public IEnumerable<string> GetExistingDevices()
        {
            var patients = dbContext.Device
                .Select(x => x.Name)
                .OrderBy(x => x);
            return patients;
        }
    }
}
