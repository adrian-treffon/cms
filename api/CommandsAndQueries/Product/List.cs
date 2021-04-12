using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace api.CommandsAndQueries.Product
{
    public class List
    {
    public class ProductsEnvelope
    {
      public List<Entities.Product> Products { get; set; }
      public int ProductCount { get; set; }
    }

      public class Query : IRequest<ProductsEnvelope>
      {
        public Query(int? limit, int? offset, string orderBy, bool isDescending)
        {
          Limit = limit;
          Offset = offset;
          OrderBy = orderBy;
          IsDescending = isDescending;
        }
        public int? Limit { get; set; }
        public int? Offset { get; set; }
        public string OrderBy { get; set; }
        public bool IsDescending { get; set; }
      }

      public class Handler : IRequestHandler<Query, ProductsEnvelope>
      {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
          _context = context;
        }

        public async Task<ProductsEnvelope> Handle(Query request, CancellationToken cancellationToken)
        {
            var queryable = _context.Products
              .Include(x=> x.Type)
              .Include(x=> x.Producer)
              .Include(x=> x.Category)
              .AsQueryable();
            
            if(!string.IsNullOrEmpty(request.OrderBy))
            {
              string property = request.OrderBy.First().ToString().ToUpper() + request.OrderBy.Substring(1);
              if (request.IsDescending)    
                queryable = queryable.OrderBy($"{property} DESC");
              else
               queryable = queryable.OrderBy($"{property} ASC");
            }

            queryable = queryable.Where("Name.Contains(@0)","te");

            var products = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 10)
                .ToListAsync();

            return  new ProductsEnvelope
            {
              Products = products,
              ProductCount = queryable.Count()
            };
        }
    }
  }
}