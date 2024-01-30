using Microsoft.AspNetCore.Mvc;

namespace ToDoListAPI.Controllers
{
    public class DictionaryController : Controller
    {
        [HttpGet("dictionary/{word}")]
        public async Task<IActionResult> GetDictionaryEntry(string word)
        {
            using (var httpClient = new HttpClient())
            {
                string url = $"https://api.dictionaryapi.dev/api/v2/entries/en/{word}";
                var response = await httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return Ok(content);
                }
                return NotFound();
            }
        }
    }
}
