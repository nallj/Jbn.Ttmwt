using System;
using System.Collections.Generic;

namespace Jbn.Ttmwt.DAL
{
    public partial class Test
    {
        public int Id { get; set; }
        public int ProctorId { get; set; }
        public int PatientId { get; set; }
        public DateTimeOffset TestedOn { get; set; }
        public int? DeviceId { get; set; }
        public decimal? ComfortPace1 { get; set; }
        public decimal? ComfortPace2 { get; set; }
        public decimal? MaxPace1 { get; set; }
        public decimal? MaxPace2 { get; set; }
        public int AssistLevel { get; set; }
        public string Summary { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public DateTimeOffset? CompletedOn { get; set; }
        public DateTimeOffset? DeletedOn { get; set; }

        public virtual Device Device { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual Proctor Proctor { get; set; }
        public virtual Remarks Remarks { get; set; }
    }
}