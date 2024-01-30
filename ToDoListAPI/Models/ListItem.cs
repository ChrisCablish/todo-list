namespace ToDoListAPI.Models
{
    public class ListItem
    {
        public int SingleListId { get; set; }
        public SingleList? SingleList { get; set; }

        public int ItemId { get; set; }
        public Item? Item { get; set; }
    }
}
