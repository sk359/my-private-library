using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using orderentry.Models;
using orderentry.Repositories;

namespace orderentry.Controllers;

[Route("books")]
[ApiController]    
public class BookController : Controller
{
    private readonly ILogger<BookController> _logger;
    private readonly BookRepository _bookRepository;

    public BookController(ILogger<BookController> logger, BookRepository repo)
    {
        _logger = logger;
        _bookRepository = repo;
    }

    [HttpGet]
    public async Task<List<Book>> Get()   // TODO return Task (due to async Database access)
    {        
        return await _bookRepository.GetAsync();

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> Get(int id)
    {
        var book = await _bookRepository.GetAsync(id);

        if (book is null)
        {
            return NotFound();
        }

        return book;
    }
   

    [HttpGet("genre")]
    public async Task<List<Book>> Get([FromQuery(Name = "genre")] string genre)  // [FromQuery(Name = "genre")
    {
        return await _bookRepository.GetByGenre(genre);
       
    }

    [HttpPost]
    public async Task<ActionResult<Book>> Post([FromBody] Book book)
    {
        var maxIdBook = _bookRepository.GetHighestId();
        Console.Write("Max ID", maxIdBook);
        var nextId = maxIdBook.Id + 1;
        book.id = nextId;
        await _bookRepository.CreateAsync(book);    
        return Ok(book);  
        //return CreatedAtAction(nameof(Get), new { id = book.id }, book);
    }

}
