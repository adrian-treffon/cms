using System;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace api.CommandsAndQueries.Product
{
    public class Get
    {
      public class Query : IRequest<Entities.Product>
      {
        public int Id { get; set; }
      }

      public class CommandValidator : AbstractValidator<Query>
      {
        public CommandValidator()
        {
          RuleFor(x => x.Id).NotEmpty();
        }
      }

      public class Handler : IRequestHandler<Query, Entities.Product>
      {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
          _context = context;
        }

        public async Task<Entities.Product> Handle(Query request, CancellationToken cancellationToken)
        {
          var product = await _context.Products
          .Include(x=> x.Type)
          .Include(x=> x.Category)
          .Include(x=> x.Producer)
          .FirstAsync(x=> x.Id == request.Id);
        
          if (product == null) throw new Exception($"Product with id {request.Id} not found");

          return product;
        }
    }
    }
}
