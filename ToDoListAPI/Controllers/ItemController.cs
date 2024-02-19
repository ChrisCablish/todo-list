using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.DTOs;
using ToDoListAPI.Models;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly YourDbContext _context;
        public ItemController(YourDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateItemDto createItemDto)
        {
            var item = new Item { Description = createItemDto.Description };

            foreach (var listId in createItemDto.SingleListIds)
            {
                var singleList = await _context.SingleLists.FindAsync(listId);
                if (singleList != null)
                {
                    item.SingleLists.Add(singleList);
                }
            }

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            var itemReadDto = new ItemReadDto
            {
                Id = item.Id,
                Description = item.Description,
                SingleListIds = item.SingleLists.Select(sl => sl.Id).ToList()
            };

            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, itemReadDto);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {

            var item = await _context.Items
                .Include(i => i.SingleLists)  // Include the SingleLists in the query
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetAllItems()
        {
            var items = await _context.Items
                .Include(i => i.SingleLists)
                .Select(i => new ItemReadDto
            {
                Id = i.Id,
                Description = i.Description,
                SingleListIds = i.SingleLists.Select(sl => sl.Id).ToList(),
                IsComplete = i.IsComplete
            })
            .ToListAsync();

            return Ok(items);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent(); // Returns a 204 No Content response
        }


        [HttpPut("{id}/complete")]
        public async Task<IActionResult> ToggleItemComplete(int id, [FromBody] bool isComplete)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.IsComplete = isComplete;
            await _context.SaveChangesAsync();

            return Ok(item); 
        }

        [HttpPut("{id}/changelist")]
        public async Task<IActionResult> ChangeSingleList(int id, [FromBody] List<int> singleListIds)
        {
            var item = await _context.Items.Include(i => i.SingleLists).FirstOrDefaultAsync(i => i.Id == id);
            if (item == null)
            {
                return NotFound();
            }

            // Clear existing SingleLists
            item.SingleLists.Clear();

            // Fetch and add the new SingleLists
            var newSingleLists = await _context.SingleLists.Where(sl => singleListIds.Contains(sl.Id)).ToListAsync();
            foreach (var singleList in newSingleLists)
            {
                item.SingleLists.Add(singleList);
            }

            await _context.SaveChangesAsync();

            return Ok(item); // Or any other appropriate response
        }



    }
}
