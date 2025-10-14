package com.shop.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.productEntity;

@Repository
public interface productRepository extends CrudRepository<productEntity,Integer>{
    productEntity findById(int id);
}
