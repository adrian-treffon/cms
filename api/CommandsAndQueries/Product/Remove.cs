using System;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Product
{
    public class Remove
    {
      public class Command : IRequest
      {
        public int Id { get; set; }
      }

      public class CommandValidator : AbstractValidator<Command>
      {
        public CommandValidator()
        {
          RuleFor(x => x.Id).NotEmpty();
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
           Entities.Product product = await _context.Products.FirstOrDefaultAsync(x => x.Id == request.Id);
           if(product == null) throw new Exception($"Product with id {request.Id} does not exists");

            product.IsActive = false;
            var success = await _context.SaveChangesAsync() > 0;
            if (success) return Unit.Value;
            throw new Exception("Problem saving changes");
        }
    }
    }
}