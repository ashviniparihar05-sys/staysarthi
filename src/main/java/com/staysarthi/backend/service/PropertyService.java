package com.staysarthi.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.staysarthi.backend.model.Property;
import com.staysarthi.backend.repository.PropertyRepository;

@Service
public class PropertyService {

  @Autowired
  private PropertyRepository repository;

  public List<Property> getAllProperties() {
    return repository.findAll();
  }

  public Optional<Property> getPropertyById(String id) {
    return repository.findById(id);
  }

  public Property addProperty(Property property) {
    return repository.save(property);
  }

  public Property updateProperty(String id, Property property) {
    property.setId(id);
    return repository.save(property);
  }

  public void deleteProperty(String id) {
    repository.deleteById(id);
  }
}
