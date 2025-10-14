package com.shop.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.userBasketEntity;

@Repository
public interface userBasketRepository extends CrudRepository<userBasketEntity,Integer>{
    userBasketEntity findByProductIdAndUserId(int product_id, int user_id);
    userBasketEntity[] findByUserId(int id);
}
