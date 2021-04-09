using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.ProductType
{
    public class List
    {
      public class Query : IRequest<List<Entities.ProductType>>
      {
      }

      public class Handler : IRequestHandler<Query, List<Entities.ProductType>>
      {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
          _context = context;
        }

        public async Task<List<Entities.ProductType>> Handle(Query request, CancellationToken cancellationToken)
        {
          return await _context.ProductTypes.ToListAsync();
        }
    }
  }
}
