
// package com.staysarthi.backend.controller;

// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.util.List;
// import java.util.UUID;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.MediaType;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;
// import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
// import com.staysarthi.backend.model.Property;
// import com.staysarthi.backend.service.PropertyService;

// @RestController
// @RequestMapping("/api/properties")
// // @CrossOrigin(origins = "http://localhost:5173")
// @CrossOrigin(origins = "*")
// public class PropertyController {

//   // private static final String UPLOAD_DIR = "uploads/";
//   private static final String UPLOAD_DIR = System.getProperty("java.io.tmpdir") + "/uploads/";

//   @Autowired
//   private PropertyService service;

//   @GetMapping
//   public List<Property> getAll() {
//     return service.getAllProperties();
//   }

//   @GetMapping("/{id}")
//   public Property getById(@PathVariable String id) {
//     return service.getPropertyById(id).orElse(null);
//   }

//   // ✅ IMAGE UPLOAD + PROPERTY SAVE
//   @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//   public Property add(
//       @RequestParam("title") String title,
//       @RequestParam("location") String location,
//       @RequestParam("price") double price,
//       @RequestParam("description") String description,
//       @RequestParam("rating") double rating,
//       @RequestParam("type") String type,
//       @RequestParam("gender") String gender,
//       @RequestParam("image") MultipartFile image) throws IOException {

//     // Create uploads folder if not exists
//     File uploadFolder = new File(UPLOAD_DIR);
//     if (!uploadFolder.exists()) {
//       uploadFolder.mkdirs();
//     }

//     // Generate unique filename
//     String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
//     Path filePath = Paths.get(UPLOAD_DIR + fileName);

//     // Save file to uploads folder
//     Files.write(filePath, image.getBytes());

//     // Create property object
//     Property property = new Property();
//     property.setTitle(title);
//     property.setLocation(location);
//     property.setPrice(price);
//     property.setDescription(description);
//     property.setRating(rating);
//     property.setType(type);
//     property.setGender(gender);

//     // Save image URL (NOT local path)
//     // property.setImageUrl("https://staysarthi-production.up.railway.app/uploads/filename"
//     // + fileName);
//     String baseUrl = ServletUriComponentsBuilder
//         .fromCurrentContextPath()
//         .build()
//         .toUriString();

//     property.setImageUrl(baseUrl + "/uploads/" + fileName);

//     return service.addProperty(property);
//   }

//   @DeleteMapping("/{id}")
//   public void delete(@PathVariable String id) {
//     service.deleteProperty(id);
//   }
// }
package com.staysarthi.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.staysarthi.backend.model.Property;
import com.staysarthi.backend.service.PropertyService;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

  @Autowired
  private PropertyService service;

  @Autowired
  private Cloudinary cloudinary;

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

    try {

      // 🔥 Upload image to Cloudinary
      Map uploadResult = cloudinary.uploader().upload(
          image.getBytes(),
          ObjectUtils.asMap("folder", "staysarthi"));

      String imageUrl = uploadResult.get("secure_url").toString();

      // Create property object
      Property property = new Property();
      property.setTitle(title);
      property.setLocation(location);
      property.setPrice(price);
      property.setDescription(description);
      property.setRating(rating);
      property.setType(type);
      property.setGender(gender);
      property.setImageUrl(imageUrl);

      return service.addProperty(property);

    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException("Image upload failed");
    }
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable String id) {
    service.deleteProperty(id);
  }
}
