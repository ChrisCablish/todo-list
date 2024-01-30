using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using ToDoListAPI.Models;

public class YourDbContext : DbContext
{
    public YourDbContext(DbContextOptions<YourDbContext> options) : base(options)
    {
    }

    public DbSet<SingleList> SingleLists { get; set; }
    public DbSet<Item> Items { get; set; }
 
}

