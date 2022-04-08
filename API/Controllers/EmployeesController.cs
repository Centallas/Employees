using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class EmployeesController : BaseApiController
    {
        private readonly DataContext _context;
        public EmployeesController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet("{id}")] // employees/id
        public async Task<ActionResult<Employee>> GetEmployee(Guid id)
        {
            return await _context.Employees.FindAsync(id);
        }

    }
}