using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace orderentry.Models;

public class Book
{
    
    /*
    [BsonId]
    [BsonElement("_id")]
    public int Id { get; set; }*/
    
    
    
    [BsonId] // primary key
    //[BsonRepresentation(BsonType.ObjectId)]
    public int Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }
    
    [BsonElement("year")]
    public int Year { get; set; }

     [BsonElement("genre")]
    public string Genre { get; set; }

    [BsonElement("abstract")]
    public string Abstract { get; set; }

    [BsonElement("summary")]
    public string Summary { get; set; }

    [BsonElement("rating")]
    public int Rating { get; set; }

    [BsonElement("authors")]
    public ICollection<string> Authors { get; set; } = [];
    
    [BsonElement("keywords")]
    public ICollection<string> Keywords { get; set; } = [];

    public Book(int id, string title, int year, string genre, string abstractText, string summary, int rating)
    {
        this.Id = id;
        this.Title = title;
        this.Year = year;
        this.Genre = genre;
        this.Abstract = abstractText;
        this.Summary = summary;
        this.Rating = rating;
    }

    // instead of declaring a constructor the attributes can be decorated with [Required]

    
}