using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;

namespace api.CommandsAndQueries.Producer
{
    public class Create
    {
      public class Command : IRequest
      {
        public string Name { get; set; }
      }

      public class CommandValidator : AbstractValidator<Command>
      {
        public CommandValidator()
        {
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
            var producer = _context.Producers.FirstOrDefault(x => x.Name == request.Name);
            if(producer != null) throw new Exception($"Producer with name {request.Name} already exist");

            Entities.Producer newProducer = new Entities.Producer{Name = request.Name, IsActive = true};
            _context.Producers.Add(newProducer);

            var success = await _context.SaveChangesAsync() > 0;
            if (success) return Unit.Value;
            throw new Exception("Problem saving changes");
        }
      }
    }
}