namespace ToDoListAPI.Models
{
    public class SingleList
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public List<Item> Items { get; } = new List<Item>();
    }
}
