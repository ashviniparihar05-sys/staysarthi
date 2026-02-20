package com.staysarthi.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.staysarthi.backend.model.VisitBooking;

public interface VisitBookingRepository extends MongoRepository<VisitBooking, String> {
}
