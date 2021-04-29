using System;

namespace api.Entities
{
    public class Delivery
    {
      public int Id { get; set; }
      public int DeliveryTypeId { get; set; }
      public  DeliveryType DeliveryType { get; set; }
      public bool Insured { get; set; }
      public DateTime CreatedAt  { get; set; }
      public float InsuranceAmount { get; set; }
      public bool COD { get; set; }
      public string ConsignmentNoteNumber { get; set; }
    }
}