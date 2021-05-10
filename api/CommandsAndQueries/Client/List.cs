using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Client
{
    public class List
    {
      public class Query : IRequest<List<Entities.Customer>>
      {
      }

      public class Handler : IRequestHandler<Query, List<Entities.Customer>>
      {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
          _context = context;
        }

        public async Task<List<Entities.Customer>> Handle(Query request, CancellationToken cancellationToken)
        {
          return await _context.Customers.Include(x => x.Address).Include(x => x.ShipAddress).ToListAsync();
        }
    }
    }
}