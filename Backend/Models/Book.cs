using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace orderentry.Models;

/**
* Uses Bson:  Binary Javascript Object Notation
* [Required] vs required:
* [Required] => Validates that the field isn't null. (Validation attributes let you specify validation rules for model properties. )
* required (since C# 11) => Any expression that initializes a new instance of the type must initialize all required members
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
    
    [BsonElement("keywords")]
    public ICollection<string> keywords { get; set; } = [];
    
    
}