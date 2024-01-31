namespace ToDoListAPI.DTOs
{
    public class ItemReadDto
    {
        public int Id { get; set; }
        public required string Description { get; set; } = string.Empty;
        public List<int> SingleListIds { get; set; } = new List<int>();
    }
}
