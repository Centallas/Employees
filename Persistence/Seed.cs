using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Employees.Any()) return;
            
            var employees = new List<Employee>
            {
                new Employee
                {
                    employee_name = "Employee 1",
                    employee_age = 48,
                    employee_annual_salary = 0,
                    employee_salary  = 6000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",                   
                },
                new Employee
                {
                    employee_name = "Employee 2",
                    employee_age = 35,
                    employee_annual_salary = 0,
                    employee_salary  = 6000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                },
                new Employee
                {
                    employee_name = "Employee 3",
                    employee_age = 27,
                    employee_annual_salary = 0,
                    employee_salary  = 6000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                },
                new Employee
                {
                    employee_name = "Employee 4",
                    employee_age = 33,
                    employee_annual_salary = 0,
                    employee_salary  = 13000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                },
                new Employee
                {
                    employee_name = "Employee 5",
                    employee_age = 27,
                    employee_annual_salary = 0,
                    employee_salary  = 3000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                },
                new Employee
                {
                   employee_name = "Employee 6",
                    employee_age = 49,
                    employee_annual_salary = 0,
                    employee_salary  = 1000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                },
                new Employee
                {
                    employee_name = "Employee 7",
                    employee_age = 38,
                    employee_annual_salary = 0,
                    employee_salary  = 5000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                },
                new Employee
                {
                     employee_name = "Employee 8",
                    employee_age = 39,
                    employee_annual_salary = 0,
                    employee_salary  = 6000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                },
                new Employee
                {
                    employee_name = "Employee 9",
                    employee_age = 39,
                    employee_annual_salary = 0,
                    employee_salary  = 6000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                },
                new Employee
                {
                     employee_name = "Employee 10",
                    employee_age = 38,
                    employee_annual_salary = 0,
                    employee_salary  = 6000000,
                    Date =DateTime.Now.AddMonths(-2),
                    profile_image = "image",              
                }
            };

            await context.Employees.AddRangeAsync(employees);
            await context.SaveChangesAsync();
        }
    }
}