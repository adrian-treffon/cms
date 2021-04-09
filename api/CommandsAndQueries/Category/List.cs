using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Category
{
    public class List
    {
      public class Query : IRequest<List<Entities.Category>>
      {
      }

      public class Handler : IRequestHandler<Query, List<Entities.Category>>
      {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
          _context = context;
        }

        public async Task<List<Entities.Category>> Handle(Query request, CancellationToken cancellationToken)
        {
          return await _context.Categories.ToListAsync();
        }
    }
  }
}
