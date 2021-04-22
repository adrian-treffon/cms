using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;

namespace api.CommandsAndQueries.Category
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
            var category = _context.Categories.FirstOrDefault(x => x.Name == request.Name);
            if(category != null) throw new Exception($"Category with name {request.Name} already exist");

            Entities.Category newCategory = new Entities.Category{Name = request.Name, IsActive = true};
            _context.Categories.Add(newCategory);

            var success = await _context.SaveChangesAsync() > 0;
            if (success) return Unit.Value;
            throw new Exception("Problem saving changes");
        }
      }
    }
}