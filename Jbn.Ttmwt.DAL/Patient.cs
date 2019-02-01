using System;
using System.Collections.Generic;

namespace Jbn.Ttmwt.DAL
{
    public partial class Patient
    {
        public Patient()
        {
            Test = new HashSet<Test>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset FirstVisitedOn { get; set; }

        public virtual ICollection<Test> Test { get; set; }
    }
}