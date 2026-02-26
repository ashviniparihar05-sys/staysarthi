// package com.staysarthi.backend.repository;

// import org.springframework.data.mongodb.repository.MongoRepository;
// import com.staysarthi.backend.model.Property;

// public interface PropertyRepository extends MongoRepository<Property, String> {
// }
package com.staysarthi.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.staysarthi.backend.model.Property;

@Repository
public interface PropertyRepository extends MongoRepository<Property, String> {

}
