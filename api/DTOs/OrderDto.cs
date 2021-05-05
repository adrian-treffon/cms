using System;
using System.Collections.Generic;
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
      public DeliveryDto Delivery {get; set;}
      public List<ProductDto> Products {get; set;} = new List<ProductDto>();
    }
}