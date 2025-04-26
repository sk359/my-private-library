using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace orderentry.Models;

/**
* Uses Bson:  Binary Javascript Object Notation
*/

public class Book
{
    
    /*
    [BsonId]
    [BsonElement("_id")]
    public int Id { get; set; }*/
    
    
    
    [BsonId] // primary key
    //[BsonRepresentation(BsonType.ObjectId)]
    public int id { get; set; }

    [BsonElement("title")]
    [Required]
    public required string title { get; set; }
    
    [BsonElement("year")]
    [Required]
    public required int year { get; set; }

    [BsonElement("genre")]
    [Required]
    public required string genre { get; set; }

    [BsonElement("shortSummary")]
    [Required]
    public required string shortSummary { get; set; }

    [BsonElement("summary")]
    [Required]
    public required string summary { get; set; }

    [BsonElement("rating")]
    [Required]
    public required int rating { get; set; }

    [BsonElement("author")]
    [Required]
    public required string author { get; set; }
    
    //[BsonElement("keywords")]
   // public ICollection<string> keywords { get; set; } = [];

    /*
    public Book(int id, string title, int year, string genre, string abstractText, string summary, int rating)
    {
        this.id = id;
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.shortSummary = abstractText;
        this.summary = summary;
        this.rating = rating;
    }
    */

    // instead of declaring a constructor the attributes can be decorated with [Required]

    
}