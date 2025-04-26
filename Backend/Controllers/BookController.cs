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
    public async Task<List<Book>> GetAll(int? limit)   // TODO return Task (due to async Database access)
    {      
        Console.Write(limit);  
        if (limit != null && limit > 0) {
          return await _bookRepository.GetLastBooks((int)limit);  
        } else {
            return await _bookRepository.GetAsync();
        }
    }

    /*

    [HttpGet("filtered")]
    public async Task<List<Book>> Get([FromQuery] int limit, string? genre)  // [FromQuery(Name = "genre")
    {
        Console.Write(limit);
        return await _bookRepository.GetLastBooks(limit, genre);       
    }
    */

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

    [HttpPut]
    public async Task<ActionResult<Book>> Edit([FromBody] Book book)
    {        
        await _bookRepository.UpdateAsync(book.id, book);    
        return Ok(book);          
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Book>> Delete(int id)
    {        
        await _bookRepository.RemoveAsync(id);    
        return Ok(id);          
    }

}
