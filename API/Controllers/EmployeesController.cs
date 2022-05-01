using Application.Employees;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EmployeesController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            return await Mediator.Send(new List.Query());

        }

        [HttpGet("{id}")] // employees/id
        public async Task<ActionResult<Employee>> GetEmployee(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(Employee employee)
        {
            return Ok(await Mediator.Send(new Create.Command { Employee = employee }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmployee(Guid id, Employee employee)
        {
            employee.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Employee = employee }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }


    }
}