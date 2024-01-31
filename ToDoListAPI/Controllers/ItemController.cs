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
                SingleListIds = i.SingleLists.Select(sl => sl.Id).ToList()
            })
            .ToListAsync();

            return Ok(items);
        }

    }
}
