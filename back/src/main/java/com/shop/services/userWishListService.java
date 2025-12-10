package com.shop.services;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.userWishListEntity;
import com.shop.repository.userWishListRepository;

@Service
public class userWishListService {
    @Autowired
    userService userService;

    @Autowired
    userWishListRepository userWishListRepository;

    /**
     * This function add a new product to user wish list
     * @param : 'product_id' to add
     * @return : the new product whishList
     */
    public userWishListEntity addProductToUserWishList(String product_id) throws NumberFormatException, ParseException {
        userWishListEntity entity = userWishListRepository.findByProductIdAndUserId(Integer.parseInt(product_id), userService.getMe());

        if (entity != null) {
            entity.setUpdatedAt(new TimeService().getTime());
            userWishListRepository.save(entity);
            return entity;
        } else {
            userWishListEntity userBasket = new userWishListEntity();
            userBasket.setUserId(userService.getMe());
            userBasket.setProductId(Integer.parseInt(product_id));
            userBasket.setCreatedAt(new TimeService().getTime());
            userBasket.setUpdatedAt(new TimeService().getTime());
            userWishListRepository.save(userBasket);
            return userBasket;
        }
    }

    /**
     * This function delete a product from user wish list
     * @param : the 'product_id' to remove
     * @return : the new wish list
     */
    public void deleteProductFromUserWishList(String product_id) throws NumberFormatException, ParseException {
        userWishListRepository.delete(userWishListRepository.findByProductIdAndUserId(Integer.parseInt(product_id),userService.getMe()));
    }

    /**
     * This function return all products
     * @return : a userWishListEntity tab containing all products
     */
    public userWishListEntity[] getAllProducts() throws ParseException {
        return userWishListRepository.findByUserId(userService.getMe());
    }
    
}
