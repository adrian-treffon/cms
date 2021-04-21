using System;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;

namespace api.CommandsAndQueries.ProductType
{
    public class Create
    {
      public class Command : IRequest
      {
        public string Name { get; set; }
        public string Parameters { get; set; }
      }

      public class CommandValidator : AbstractValidator<Command>
      {
        public CommandValidator()
        {
          RuleFor(x => x.Name).NotEmpty();
          RuleFor(x => x.Parameters).NotEmpty();
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
            Entities.ProductType productType = new Entities.ProductType{Name = request.Name, Parameters = request.Parameters};
            _context.ProductTypes.Add(productType);

            var success = await _context.SaveChangesAsync() > 0;
            if (success) return Unit.Value;
            throw new Exception("Problem saving changes");
        }
      }
    }
}