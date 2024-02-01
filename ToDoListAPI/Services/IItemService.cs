using ToDoListAPI.Models;

namespace ToDoListAPI.Services
{
    public interface IItemService
    {
        Task<IEnumerable<Item>> GetAllItemsAsync();
        Task<Item> AddItemAsync(Item newItem, List<int> singleListIds);
        Task<Item> GetItemByIdAsync(int id);
        Task DeleteItemAsync(int id);
    }
}
