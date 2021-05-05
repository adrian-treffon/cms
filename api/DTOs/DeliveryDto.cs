using System;

namespace api.DTOs
{
    public class DeliveryDto
    {
      public int Id { get; set; }
      public string DeliveryType { get; set; }
      public bool Insured { get; set; }
      public DateTime CreatedAt  { get; set; }
      public float InsuranceAmount { get; set; }
      public bool COD { get; set; }
      public string ConsignmentNoteNumber { get; set; }
      public float Price { get; set; }
    }
}