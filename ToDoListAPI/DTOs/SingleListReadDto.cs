namespace ToDoListAPI.DTOs
{
    public class SingleListReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<int> ItemIds { get; set; } = new List<int>();
    }
}
