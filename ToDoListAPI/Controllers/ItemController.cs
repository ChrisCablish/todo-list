using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.DTOs;
using ToDoListAPI.Models;
using ToDoListAPI.Services;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly YourDbContext _context;
        private readonly IItemService _itemService;

        public ItemController(YourDbContext context, IItemService itemService)
        {
            _context = context;
            _itemService = itemService;
        }        

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateItemDto createItemDto)
        {
            var newItem = new Item { Description = createItemDto.Description };
            var createdItem = await _itemService.AddItemAsync(newItem, createItemDto.SingleListIds);

            var itemReadDto = new ItemReadDto
            {
                Id = createdItem.Id,
                Description = createdItem.Description,
                SingleListIds = createdItem.SingleLists.Select(sl => sl.Id).ToList()
            };

            return CreatedAtAction(nameof(GetItem), new { id = createdItem.Id }, itemReadDto);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ItemReadDto>> GetItem(int id)
        {
            var item = await _itemService.GetItemByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            var itemReadDto = new ItemReadDto
            {
                Id = item.Id,
                Description = item.Description,
                SingleListIds = item.SingleLists.Select(sl => sl.Id).ToList()
            };
            return Ok(itemReadDto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemReadDto>>> GetAllItems()
        {
            var items = await _itemService.GetAllItemsAsync();
            var itemsReadDto = items.Select(item => new ItemReadDto
            {
                Id = item.Id,
                Description = item.Description,
                SingleListIds = item.SingleLists.Select(sl => sl.Id).ToList()
            }).ToList();
            return Ok(itemsReadDto);
        }
    }
}
