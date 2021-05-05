namespace api.DTOs
{
    public class ProductDto
    {
      public int Id { get; set; }
      public string SKU { get; set; }
      public string Name { get; set; }
      public string EAN { get; set; }
      public float GrossPrice { get; set; }
      public int VAT { get; set; }
      public int Quantity { get; set; }
    }
}