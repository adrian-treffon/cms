namespace api.Entities
{
    public class ProductOrders
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int Quantity { get; set; }
        public float GrossPrice { get; set; }
        public int VAT { get; set; }
    }
}