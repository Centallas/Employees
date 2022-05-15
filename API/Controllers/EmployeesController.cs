using System.Text.Json;
using Application.Employees;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;

namespace API.Controllers
{
    public class EmployeesController : BaseApiController
    {
        /*https://blog.devgenius.io/in-memory-and-distributed-cache-net-core-9be16bec34d7*/
        private readonly IDistributedCache _distributedCache;
        private readonly string employeesCollectionKey = "employeesCollectionKey";



        public EmployeesController(IDistributedCache distributedCache)
        {
            _distributedCache = distributedCache;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployees()
        {
            // Find cached item
            byte[] objectFromCacheId = await _distributedCache.GetAsync(employeesCollectionKey);

            if (objectFromCacheId != null)
            {
                try
                {
                    // Deserialize it
                    var jsonToDeserialize = System.Text.Encoding.UTF8.GetString(objectFromCacheId);
                    var cachedResult = JsonSerializer.Deserialize<List<Employee>>(jsonToDeserialize);
                    if (cachedResult != null)
                    {
                        // If found, then return it
                        return cachedResult;
                    }

                }
                catch (System.Exception ex)
                {
                    var res = ex;

                }

            }
            // If not found, then recalculate response
            var result = await Mediator.Send(new List.Query());

            // Serialize the response
            byte[] objectToCache = JsonSerializer.SerializeToUtf8Bytes(result);
            var cacheEntryOptions = new DistributedCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromSeconds(60))
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(120));

            // Cache it
            await _distributedCache.SetAsync(employeesCollectionKey, objectToCache, cacheEntryOptions);

            return result;

        }

        [HttpGet("{id}")] // employees/id
        public async Task<ActionResult<Employee>> GetEmployee(Guid id)
        {
            // Find cached item
            byte[] objectFromCacheId = await _distributedCache.GetAsync(employeesCollectionKey);

            if (objectFromCacheId != null)
            {
                try
                {
                    // Deserialize it
                    var jsonToDeserialize = System.Text.Encoding.UTF8.GetString(objectFromCacheId);
                    var cachedResult = JsonSerializer.Deserialize<Employee>(jsonToDeserialize);
                    if (cachedResult != null)
                    {
                        // If found, then return it
                        return cachedResult;
                    }

                }
                catch (System.Exception ex)
                {
                    throw new Exception(ex.ToString());

                }

            }

            var result = await Mediator.Send(new Details.Query { Id = id });

            // Serialize the response
            byte[] objectToCache = JsonSerializer.SerializeToUtf8Bytes(result);
            var cacheEntryOptions = new DistributedCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromSeconds(60))
                .SetAbsoluteExpiration(TimeSpan.FromSeconds(120));

            // Cache it
            await _distributedCache.SetAsync(employeesCollectionKey, objectToCache, cacheEntryOptions);

            return result;
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