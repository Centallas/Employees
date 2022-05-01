using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Employee Employee { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var employee = await _context.Employees.FindAsync(request.Employee.Id);
                //employee.employee_name = request.Employee.employee_name ?? employee.employee_name;
                _mapper.Map(request.Employee, employee);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }



    }
}