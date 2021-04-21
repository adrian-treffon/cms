using System;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Producer
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
           Entities.Producer producer = await _context.Producers.FirstOrDefaultAsync(x => x.Id == request.Id);
           if(producer == null) throw new Exception($"Producer with id {request.Id} does not exists");
           _context.Producers.Remove(producer);
       
            var success = await _context.SaveChangesAsync() > 0;
            if (success) return Unit.Value;
            throw new Exception("Problem saving changes");
        }
    }
  }
}