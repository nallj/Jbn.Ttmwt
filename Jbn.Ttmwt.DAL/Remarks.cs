using System;
using System.Collections.Generic;

namespace Jbn.Ttmwt.DAL
{
    public partial class Remarks
    {
        public int Id { get; set; }
        public int TestId { get; set; }
        public string Content { get; set; }

        public virtual Test Test { get; set; }
    }
}