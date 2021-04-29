using System.Collections.Generic;
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
        return mapper.Map<List<OrderDto>>(
          await context.Orders
            .Include(x=> x.Customer)
            .ThenInclude(x=> x.Address)
            .Include(x=> x.Customer)
            .ThenInclude(x=> x.ShipAddress)
            .ToListAsync());
      }
    }
  }
}