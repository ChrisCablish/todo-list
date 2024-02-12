namespace ToDoListAPI.Models
{
    public class Item
    {
        public int Id { get; set; }
        public required string Description {  get; set; }
        public List<SingleList> SingleLists { get; } = new List<SingleList>();
        public bool IsComplete { get; set; } = false; // Default value set to false
    }
}
