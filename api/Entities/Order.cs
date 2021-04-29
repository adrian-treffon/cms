using System;

namespace api.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime CreatedAt  { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int DeliveryId { get; set; }
        public Delivery Delivery { get; set; }
        public bool ShippingAddressSameAsCustomer { get; set; }
        public OrderStatus Status { get; set; }
        public float DeliveryPrice  { get; set; }
    }
}