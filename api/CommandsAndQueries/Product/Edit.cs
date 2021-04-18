using System;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using FluentValidation;
using MediatR;

namespace api.CommandsAndQueries.Product
{
    public class Edit
    {
        public class Command : IRequest
      {
        public int Id { get; set; }
        public string SKU { get; set; }
        public string Name { get; set; }
        public string EAN { get; set; }
        public string Description { get; set; }
        public float? GrossPrice { get; set; }
        public int? VAT { get; set; }
        public float? PromotionalPrice { get; set; } 
        public int? Availability { get; set; }
        public string AvailabilityUnit { get; set; }
        public string LeadTime { get; set; }
        public string NotAvailableMessage { get; set; }
        public string AvailabilityMessage { get; set; }
        public int? CategoryId { get; set; }
        public int? ProducerId { get; set; }
        public int? TypeId { get; set; }
        public bool? IsActive { get; set; }
        public string Parameters { get; set; }
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

          if((await _context.Categories.FindAsync(request.CategoryId)) == null)
          throw new Exception($"Category with id {request.CategoryId} does not exist");

          if((await _context.Producers.FindAsync(request.ProducerId)) == null)
          throw new Exception($"Producer with id {request.ProducerId} does not exist");

          if((await _context.ProductTypes.FindAsync(request.TypeId)) == null)
          throw new Exception($"Product type with id {request.TypeId} does not exist");

          var product = await _context.Products.FindAsync(request.Id);

          product.Availability = request.Availability ?? product.Availability;
          product.AvailabilityMessage = request.AvailabilityMessage ?? product.AvailabilityMessage;
          product.AvailabilityUnit = request.AvailabilityUnit ??  product.AvailabilityUnit;
          product.CategoryId = request.CategoryId ?? product.CategoryId;
          product.Description = request.Description ?? product.Description;
          product.EAN = request.EAN ?? product.EAN;
          product.GrossPrice = request.GrossPrice ?? product.GrossPrice;
          product.IsActive = request.IsActive ?? product.IsActive;
          product.LeadTime = request.LeadTime ?? product.LeadTime;
          product.ModifiedAt = DateTime.Now;
          product.Name = request.Name ?? product.Name;
          product.NotAvailableMessage = request.NotAvailableMessage ?? product.NotAvailableMessage;
          product.SKU = request.SKU ?? product.SKU;
          product.VAT = request.VAT ?? product.VAT;
          product.TypeId = request.TypeId ?? product.TypeId;
          product.Parameters = request.Parameters ?? product.Parameters;
          product.PromotionalPrice = request.PromotionalPrice ?? product.PromotionalPrice;
          product.ProducerId = request.ProducerId ??  product.ProducerId;
      
          var success = await _context.SaveChangesAsync() > 0;
          if (success) return Unit.Value;
          throw new Exception("Problem saving changes");
        }
      }
    }
}