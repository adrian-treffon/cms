using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Producer
{
    public class List
    {
      public class Query : IRequest<List<Entities.Producer>>
      {
      }

      public class Handler : IRequestHandler<Query, List<Entities.Producer>>
      {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
          _context = context;
        }

        public async Task<List<Entities.Producer>> Handle(Query request, CancellationToken cancellationToken)
        {
          return await _context.Producers.ToListAsync();
        }
    }
  }
}
