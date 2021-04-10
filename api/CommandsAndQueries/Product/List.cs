using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Product
{
    public class List
    {
      public class Query : IRequest<List<Entities.Product>>
      {
      }

      public class Handler : IRequestHandler<Query, List<Entities.Product>>
      {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
          _context = context;
        }

        public async Task<List<Entities.Product>> Handle(Query request, CancellationToken cancellationToken)
        {
          return await _context.Products
            .Include(x=> x.Type)
            .Include(x=> x.Producer)
            .Include(x=> x.Category)
            .ToListAsync();
        }
    }
  }
}