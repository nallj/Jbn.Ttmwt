using System;

namespace Jbn.Ttmwt.WebServices.Features.Records
{
    public class Record : RecordIds
    {
        public DateTimeOffset TakenOn { get; set; }
        public string Summary { get; set; }
    }
}
