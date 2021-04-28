using System;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Producer
{
    public class Edit
    {
      public class Command : IRequest
      {
        public int Id { get; set; }
        public string Name { get; set; }
      }

      public class CommandValidator : AbstractValidator<Command>
      {
        public CommandValidator()
        {
          RuleFor(x => x.Id).NotEmpty();
          RuleFor(x => x.Name).NotEmpty();
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
           if(producer.Name != request.Name)
           {
              producer.Name = request.Name;
              await _context.SaveChangesAsync();
           }
            return Unit.Value;
        }
    }
    }
}