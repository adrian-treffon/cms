using System;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Order
{
    public class Edit
    {
      public class Command : IRequest
      {
        public int Id { get; set; }
        public int Status { get; set; }
      }

      public class CommandValidator : AbstractValidator<Command>
      {
        public CommandValidator()
        {
          RuleFor(x => x.Id).NotEmpty();
          RuleFor(x => x.Status).NotEmpty();
        }
      }
      public class Handler : IRequestHandler<Command>
      {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
          _context = context;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
           Entities.Order order = await _context.Orders.Include(x => x.Delivery).FirstOrDefaultAsync(x => x.Id == request.Id);
           if(order == null) throw new Exception($"Order with id {request.Id} does not exists");
           if((int)order.Status != request.Status)
           {
              if(order.Status == OrderStatus.InProgress && request.Status == (int)OrderStatus.Send)
              {
                order.Delivery.CreatedAt = DateTime.Now;
                order.Delivery.ConsignmentNoteNumber = "ABC/123/2021";
              }
              order.Status = (OrderStatus)request.Status;
              await _context.SaveChangesAsync();
           }
            return Unit.Value;
        }
    }
    }
}