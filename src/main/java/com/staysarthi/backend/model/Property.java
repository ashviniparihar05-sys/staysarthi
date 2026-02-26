// package com.staysarthi.backend.model;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// @Document(collection = "properties")
// public class Property {

//   @Id
//   private String id;

//   private String title;
//   private String location;
//   private double price;
//   private String description;
//   private String imageUrl;
//   private double rating;
//   private String type;
//   private String gender;

//   public Property() {
//   }

//   // ======== GETTERS & SETTERS ========

//   public String getId() {
//     return id;
//   }

//   public void setId(String id) {
//     this.id = id;
//   }

//   public String getTitle() {
//     return title;
//   }

//   public void setTitle(String title) {
//     this.title = title;
//   }

//   public String getLocation() {
//     return location;
//   }

//   public void setLocation(String location) {
//     this.location = location;
//   }

//   public double getPrice() {
//     return price;
//   }

//   public void setPrice(double price) {
//     this.price = price;
//   }

//   public String getDescription() {
//     return description;
//   }

//   public void setDescription(String description) {
//     this.description = description;
//   }

//   public String getImageUrl() {
//     return imageUrl;
//   }

//   public void setImageUrl(String imageUrl) {
//     this.imageUrl = imageUrl;
//   }

//   public double getRating() {
//     return rating;
//   }

//   public void setRating(double rating) {
//     this.rating = rating;
//   }

//   public String getType() {
//     return type;
//   }

//   public void setType(String type) {
//     this.type = type;
//   }

//   public String getGender() {
//     return gender;
//   }

//   public void setGender(String gender) {
//     this.gender = gender;
//   }
// }
package com.staysarthi.backend.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "properties")
public class Property {

  @Id
  private String id;

  private String title;
  private String location;
  private double price;
  private String description;
  private String imageUrl;
  private double rating;
  private String type;
  private String gender;
  private List<String> amenities;

  public Property() {
  }

  // ===== GETTERS & SETTERS =====

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public double getRating() {
    return rating;
  }

  public void setRating(double rating) {
    this.rating = rating;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public List<String> getAmenities() {
    return amenities;
  }

  public void setAmenities(List<String> amenities) {
    this.amenities = amenities;
  }
}
