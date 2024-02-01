using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Models;


namespace ToDoListAPI.Services
{
    public class ItemService : IItemService
    {
        private readonly YourDbContext _context;

        public ItemService(YourDbContext context) {  _context = context; }

        public async Task<IEnumerable<Item>> GetAllItemsAsync()
        {
            return await _context.Items.ToListAsync();
        }

        public async Task<Item> AddItemAsync(Item newItem, List<int> singleListIds)
        {
            var singleLists = await _context.SingleLists.Where(sl => singleListIds.Contains(sl.Id)).ToListAsync();

            // Associate the SingleLists with the newItem
            foreach (var singleList in singleLists)
            {
                newItem.SingleLists.Add(singleList);
            }

            _context.Items.Add(newItem);
            await _context.SaveChangesAsync();
            return newItem;
        }

        public async Task<Item> GetItemByIdAsync(int id)
        {
           return await _context.Items.Include(item => item.SingleLists).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task DeleteItemAsync(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item != null)
            {
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

    }
}
