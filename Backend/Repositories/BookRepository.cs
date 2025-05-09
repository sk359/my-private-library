using orderentry.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace orderentry.Repositories;

// https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mongo-app?view=aspnetcore-9.0&tabs=visual-studio-code#add-a-crud-operations-service

public class BookRepository
{
    private readonly IMongoCollection<Book> _booksCollection;

    public BookRepository(
        IOptions<LibraryDatabaseSettings> bookStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            bookStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            bookStoreDatabaseSettings.Value.DatabaseName);

        _booksCollection = mongoDatabase.GetCollection<Book>(
            bookStoreDatabaseSettings.Value.BooksCollectionName);
    }

    public async Task<List<Book>> GetAsync() =>
        await _booksCollection.Find(_ => true).ToListAsync();

    public async Task<List<Book>> GetLastBooks(int limit) 
    {
        //if (genre != null) {
        //   return await _booksCollection.Find(x => x.genre == genre).SortByDescending(d => d.id).Limit(limit).ToListAsync();
        //} else {
        return await _booksCollection.Find(x => true).SortByDescending(d => d.id).Limit(limit).ToListAsync();
        //}
    }

    public async Task<Book?> GetAsync(int id) =>
        await _booksCollection.Find(x => x.id == id).FirstOrDefaultAsync();

    public async Task<List<Book>> GetByGenre(string genre) 
    {
        var results = 
            from book in _booksCollection.AsQueryable()
            where book.genre == genre
            select book;

        return results.ToList();
    }

    public async Task CreateAsync(Book newBook) =>
        await _booksCollection.InsertOneAsync(newBook);

    public async Task UpdateAsync(int id, Book updatedBook) =>
        await _booksCollection.ReplaceOneAsync(x => x.id == id, updatedBook);

    public async Task RemoveAsync(int id) =>
        await _booksCollection.DeleteOneAsync(x => x.id == id);

    public async Task<Book?> GetHighestId() =>
       await _booksCollection.Find(x => true).SortByDescending(d => d.id).Limit(1).FirstOrDefaultAsync();
}