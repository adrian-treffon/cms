using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using api.DTOs;
using AutoMapper;

namespace api.CommandsAndQueries.Order
{
    public class Get
    {
    public class Query : IRequest<OrderDto>
    {
      public int Id {get ; set;}
    }

    public class Handler : IRequestHandler<Query, OrderDto>
    {
      private readonly DataContext context;
      private readonly IMapper mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        this.mapper = mapper;
        this.context = context;
      }

      public async Task<OrderDto> Handle(Query request, CancellationToken cancellationToken)
      {
          OrderDto order = mapper.Map<OrderDto>(
             await context.Orders
              .Include(x=> x.Customer)
              .ThenInclude(x=> x.Address)
              .Include(x=> x.Customer)
              .ThenInclude(x=> x.ShipAddress)
              .Include(x => x.Delivery)
              .ThenInclude(x => x.DeliveryType)
              .FirstAsync(x => x.Id == request.Id));

              order.Products = mapper.Map<List<ProductDto>>(await context.ProductOrders.Where(x=> x.OrderId == order.Id).Include(x=> x.Product).ToListAsync());
          
              return order;
      }
    }
    }
}