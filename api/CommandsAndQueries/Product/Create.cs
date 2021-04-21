using System;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;

namespace api.CommandsAndQueries.Product
{
    public class Create
    {
      public class Command : IRequest
      {
        public string SKU { get; set; }
        public string Name { get; set; }
        public string EAN { get; set; }
        public string Description { get; set; }
        public float GrossPrice { get; set; }
        public int VAT { get; set; }
        public float PromotionalPrice { get; set; } 
        public int Availability { get; set; }
        public string AvailabilityUnit { get; set; }
        public string LeadTime { get; set; }
        public string NotAvailableMessage { get; set; }
        public string AvailabilityMessage { get; set; }
        public int CategoryId { get; set; }
        public int ProducerId { get; set; }
        public int TypeId { get; set; }
        public bool IsActive { get; set; }
        public string Parameters { get; set; }
      }

      public class CommandValidator : AbstractValidator<Command>
      {
        public CommandValidator()
        {
          RuleFor(x => x.SKU).NotEmpty();
          RuleFor(x => x.Name).NotEmpty();
          RuleFor(x => x.EAN).NotEmpty();
          RuleFor(x => x.Description).NotEmpty();
          RuleFor(x => x.GrossPrice).NotEmpty();
          RuleFor(x => x.Availability).NotEmpty();
          RuleFor(x => x.AvailabilityUnit).NotEmpty();
          RuleFor(x => x.LeadTime).NotEmpty();
          RuleFor(x => x.NotAvailableMessage).NotEmpty();
          RuleFor(x => x.AvailabilityMessage).NotEmpty();
          RuleFor(x => x.CategoryId).NotEmpty();
          RuleFor(x => x.ProducerId).NotEmpty();
          RuleFor(x => x.TypeId).NotEmpty();
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

          if((await _context.Categories.FindAsync(request.CategoryId)) == null)
          throw new Exception($"Category with id {request.CategoryId} does not exist");

          if((await _context.Producers.FindAsync(request.ProducerId)) == null)
          throw new Exception($"Producer with id {request.ProducerId} does not exist");

          if((await _context.ProductTypes.FindAsync(request.TypeId)) == null)
          throw new Exception($"Product type with id {request.TypeId} does not exist");

           Entities.Product product = new Entities.Product
           {
              Availability = request.Availability,
              AvailabilityMessage = request.AvailabilityMessage,
              AvailabilityUnit = request.AvailabilityUnit,
              CategoryId = request.CategoryId,
              CreatedAt = DateTime.Now,
              Description = request.Description,
              EAN = request.EAN,
              GrossPrice = request.GrossPrice,
              IsActive = request.IsActive,
              LeadTime = request.LeadTime,
              ModifiedAt = DateTime.Now,
              Name= request.Name,
              NotAvailableMessage = request.NotAvailableMessage,
              SKU = request.SKU,
              VAT = request.VAT,
              TypeId = request.TypeId,
              Parameters = request.Parameters,
              PromotionalPrice = request.PromotionalPrice,
              ProducerId = request.ProducerId
           };
           _context.Products.Add(product);

            var success = await _context.SaveChangesAsync() > 0;
            if (success) return Unit.Value;
            throw new Exception("Problem saving changes");
        }
      }
  }
}