using System;
using api.Entities;

namespace api.DTOs
{
    public class OrderDto
    {
      public int Id {get; set;}
      public DateTime CreatedAt {get; set;}
      public Customer Customer {get; set;}
      public bool ShippingAddressSameAsCustomer {get; set;}
      public OrderStatus Status {get; set;}
    }
}