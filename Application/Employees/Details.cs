using Domain;
using MediatR;
using Persistence;

namespace Application.Employees
{
    public class Details
    {
        public class Query : IRequest<Employee>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Employee>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Employee> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Employees.FindAsync(request.Id);
            }
        }

    }
}