package com.shop.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.userEntity;

@Repository
public interface userRepository extends CrudRepository<userEntity, Integer> {
    boolean existsByEmail(String email);
    userEntity findByEmail(String email);
}
