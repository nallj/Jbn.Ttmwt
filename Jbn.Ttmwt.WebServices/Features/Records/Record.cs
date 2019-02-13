using System;

namespace Jbn.Ttmwt.WebServices.Features.Records
{
    public class Record //: RecordIds
    {
        public int Id { get; set; }
        //public DateTimeOffset TestedOn { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public string Summary { get; set; }
    }
}
