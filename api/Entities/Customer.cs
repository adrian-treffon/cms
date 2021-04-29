namespace api.Entities
{
    public class Customer
    {
       public int Id { get; set; }
       public Address Address { get; set; }
       public string Phone { get; set; }
       public string Mail{ get; set; }
       public string NIP { get; set; }
       public Address ShipAddress { get; set; }
    }
}