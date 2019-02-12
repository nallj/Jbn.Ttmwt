using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;

using Jbn.Ttmwt.DAL;

namespace Jbn.Ttmwt.WebServices.Features.Records
{
    public class RecordService : IRecordService
    {
        private readonly AppDbContext dbContext;

        public RecordService(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        public IEnumerable<Record> GetRecords()
        {
            var records = dbContext.Test
                .ProjectTo<Record>();
            return records;
        }

        public async Task DeleteRecord(int recordId)
        {
            var targetRecord = await dbContext.Test
                .FirstOrDefaultAsync(x => x.Id == recordId);
            dbContext.Remove(targetRecord);
            await dbContext.SaveChangesAsync();
        }
    }
}
