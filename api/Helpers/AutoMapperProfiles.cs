using api.DTOs;
using api.Entities;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
           CreateMap<Order, OrderDto>()
            .AfterMap( (x , y) => y.Delivery.Price = x.DeliveryPrice)
            .AfterMap( (x , y) => y.Delivery.DeliveryType = x.Delivery.DeliveryType.Name);
           
           CreateMap<ProductOrders, ProductDto>()
            .ForMember( x=> x.EAN, opt => opt.MapFrom(x => x.Product.EAN))
            .ForMember( x=> x.SKU, opt => opt.MapFrom(x => x.Product.SKU))
            .ForMember( x=> x.Name, opt => opt.MapFrom(x => x.Product.Name));
           
            CreateMap<Delivery, DeliveryDto>();
        }
    }
}