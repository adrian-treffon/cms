using System;

namespace api.Entities
{
    public class Product
    {
      public int Id { get; set; }
      public string SKU { get; set; }
      public string Name { get; set; }
      public string EAN { get; set; }
      public string Description { get; set; }
      public DateTime CreatedAt { get; set; }
      public DateTime ModifiedAt { get; set; }
      public bool IsActive { get; set; }
      public float GrossPrice { get; set; }
      public int VAT { get; set; }
      public float PromotionalPrice { get; set; } 
      public int Availability { get; set; }
      public string AvailabilityUnit { get; set; }
      public string LeadTime { get; set; }
      public string NotAvailableMessage { get; set; }
      public string AvailabilityMessage { get; set; }
      public Category Category { get; set; }
      public int CategoryId { get; set; }
      public Producer Producer { get; set; }
      public int ProducerId { get; set; }
      public ProductType Type { get; set; }
      public int TypeId { get; set; }
    }
}