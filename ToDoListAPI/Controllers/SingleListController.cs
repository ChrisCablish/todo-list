using Microsoft.AspNetCore.Mvc;
using ToDoListAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks; // Add this for asynchronous operations
using ToDoListAPI.DTOs;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController] // Change to ApiController for API-specific features
    public class SingleListController : ControllerBase // Change to ControllerBase
    {
        private readonly YourDbContext _context;

        // Dependency injection of the DbContext
        public SingleListController(YourDbContext context)
        {
            _context = context;
        }

        // Method to create a new SingleList
        [HttpPost]
        public async Task<IActionResult> CreateSingleList([FromBody] SingleList singleList)
        {
            _context.SingleLists.Add(singleList);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSingleList), new { id = singleList.Id }, singleList);
        }

        // Method to retrieve a SingleList (placeholder)
        [HttpGet("{id}")]
        public async Task<ActionResult<SingleList>> GetSingleList(int id)
        {
            var singleList = await _context.SingleLists
                .Include(sl => sl.Items)
                .FirstOrDefaultAsync(sl => sl.Id == id);

            if (singleList == null)
            {
                return NotFound();
            }

            var singleListDto = new SingleListReadDto
            {
                Id = singleList.Id,
                Name = singleList.Name,
                ItemIds = singleList.Items.Select(i => i.Id).ToList()
            };

            return Ok(singleListDto);
        }

        
    }
}
