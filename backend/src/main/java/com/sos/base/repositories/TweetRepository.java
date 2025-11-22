package com.sos.base.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sos.base.entities.Role;

@Repository
public interface TweetRepository extends JpaRepository<Role, Long> {
    
}
