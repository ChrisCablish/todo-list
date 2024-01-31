namespace ToDoListAPI.DTOs
{
    public class CreateItemDto
    {
        public required string Description { get; set; }
        public List<int> SingleListIds { get; set; } = new List<int>();

    }
}
