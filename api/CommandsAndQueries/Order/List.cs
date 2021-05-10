using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Order
{
  public class List
  {
    public class Query : IRequest<List<OrderDto>>
    {
      public int Status {get ; set;}
    }

    public class Handler : IRequestHandler<Query, List<OrderDto>>
    {
      private readonly DataContext context;
      private readonly IMapper mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        this.mapper = mapper;
        this.context = context;
      }

      public async Task<List<OrderDto>> Handle(Query request, CancellationToken cancellationToken)
      {
          List<OrderDto> orders = mapper.Map<List<OrderDto>>(
             await context.Orders
            .Where(x => (int)x.Status == request.Status)
            .Include(x=> x.Customer)
            .ThenInclude(x=> x.Address)
            .Include(x=> x.Customer)
            .ThenInclude(x=> x.ShipAddress)
            .Include(x => x.Delivery)
            .ThenInclude(x => x.DeliveryType)
            .OrderByDescending(x => x.CreatedAt)
            .ToListAsync());

            foreach (var order in orders)
            {
               order.Products = mapper.Map<List<ProductDto>>(await context.ProductOrders.Where(x=> x.OrderId == order.Id).Include(x=> x.Product).ToListAsync());
            }

            

            return orders;

        
      }
    }
  }
}