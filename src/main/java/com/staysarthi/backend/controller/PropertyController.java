// package com.staysarthi.backend.controller;

// import org.springframework.web.bind.annotation.*;
// import java.util.List;
// import com.staysarthi.backend.model.Property;
// import com.staysarthi.backend.repository.PropertyRepository;

// @RestController
// @RequestMapping("/api/properties")
// @CrossOrigin(origins = "http://localhost:5173")
// public class PropertyController {

//   private final PropertyRepository repository;

//   public PropertyController(PropertyRepository repository) {
//     this.repository = repository;
//   }

//   @GetMapping
//   public List<Property> getAllProperties() {
//     return repository.findAll();
//   }

//   @GetMapping("/{id}")
//   public Property getPropertyById(@PathVariable String id) {
//     return repository.findById(id).orElse(null);
//   }

//   @PostMapping
//   public Property addProperty(@RequestBody Property property) {
//     return repository.save(property);
//   }

//   @DeleteMapping("/{id}")
//   public void deleteProperty(@PathVariable String id) {
//     repository.deleteById(id);
//   }

//   @PutMapping("/{id}")
//   public Property updateProperty(@PathVariable String id, @RequestBody Property updatedProperty) {

//     return repository.findById(id)
//         .map(property -> {
//           property.setTitle(updatedProperty.getTitle());
//           property.setLocation(updatedProperty.getLocation());
//           property.setPrice(updatedProperty.getPrice());
//           property.setDescription(updatedProperty.getDescription());
//           property.setImageUrl(updatedProperty.getImageUrl());
//           property.setRating(updatedProperty.getRating());
//           property.setType(updatedProperty.getType());
//           property.setGender(updatedProperty.getGender());

//           return repository.save(property);
//         })
//         .orElse(null);
//   }

// }
/*package com.staysarthi.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.staysarthi.backend.model.Property;
import com.staysarthi.backend.service.PropertyService;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

  @Autowired
  private PropertyService service;

  @GetMapping
  public List<Property> getAll() {
    return service.getAllProperties();
  }

  @GetMapping("/{id}")
  public Property getById(@PathVariable String id) {
    return service.getPropertyById(id).orElse(null);
  }

  @PostMapping
  public Property add(@RequestBody Property property) {
    return service.addProperty(property);
  }

  @PutMapping("/{id}")
  public Property update(@PathVariable String id,
      @RequestBody Property property) {
    return service.updateProperty(id, property);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id) {
    service.deleteProperty(id);
  }
}*/
package com.staysarthi.backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.staysarthi.backend.model.Property;
import com.staysarthi.backend.service.PropertyService;

@RestController
@RequestMapping("/api/properties")
// @CrossOrigin(origins = "http://localhost:5173")
 @CrossOrigin(origins = "*")
public class PropertyController {

  private static final String UPLOAD_DIR = "src/main/resources/static/uploads/";

  @Autowired
  private PropertyService service;

  @GetMapping
  public List<Property> getAll() {
    return service.getAllProperties();
  }

  @GetMapping("/{id}")
  public Property getById(@PathVariable String id) {
    return service.getPropertyById(id).orElse(null);
  }

  // ✅ IMAGE UPLOAD + PROPERTY SAVE
  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public Property add(
      @RequestParam("title") String title,
      @RequestParam("location") String location,
      @RequestParam("price") double price,
      @RequestParam("description") String description,
      @RequestParam("rating") double rating,
      @RequestParam("type") String type,
      @RequestParam("gender") String gender,
      @RequestParam("image") MultipartFile image) throws IOException {

    // Create uploads folder if not exists
    File uploadFolder = new File(UPLOAD_DIR);
    if (!uploadFolder.exists()) {
      uploadFolder.mkdir();
    }

    // Generate unique filename
    String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
    Path filePath = Paths.get(UPLOAD_DIR + fileName);

    // Save file to uploads folder
    Files.write(filePath, image.getBytes());

    // Create property object
    Property property = new Property();
    property.setTitle(title);
    property.setLocation(location);
    property.setPrice(price);
    property.setDescription(description);
    property.setRating(rating);
    property.setType(type);
    property.setGender(gender);

    // Save image URL (NOT local path)
    property.setImageUrl("https://staysarthi-production.up.railway.app/uploads/filename" + fileName);
    

    return service.addProperty(property);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id) {
    service.deleteProperty(id);
  }
}
