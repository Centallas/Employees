namespace Domain
{
    public class Employee
    {
        /*the advantage of using a Guid is that if we do create the ID on the 
        client side, then we don't have to wait for ourdatabase server to generate 
        the ID for us and send it back to us.
        We can actually do it all inside the client.*/
        public Guid Id { get; set; }
        public string? employee_name { get; set; }
        public int employee_salary { get; set; }
        public int employee_age { get; set; }
        public int employee_annual_salary { get; set; }
        public DateTime Date { get; set; }
        public string? profile_image { get; set; }
    }
}