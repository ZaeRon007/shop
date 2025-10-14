package com.shop.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shop.model.userWishListEntity;

@Repository
public interface userWishListRepository extends CrudRepository<userWishListEntity,Integer>{
    userWishListEntity findByProductIdAndUserId(int product_id, int user_id);
    userWishListEntity[] findByUserId(int id);
}
