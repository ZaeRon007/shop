package com.shop.services;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.userBasketEntity;
import com.shop.model.dto.userBasketDto;
import com.shop.model.dto.usernameDto;
import com.shop.repository.userBasketRepository;

@Service
public class userBasketService {
    @Autowired
    userService userService;

    @Autowired
    userBasketRepository userBasketRepository;

    /**
     * This function allow to add a product to user basket list
     * @param : the 'product_id' to add and it's quantity
     * @return : the product as userBasketEntity
     */
    public userBasketEntity addProductToUserBasket(String product_id, userBasketDto userBasketDto)
            throws ParseException {
        userBasketEntity entity = userBasketRepository.findByProductIdAndUserId(Integer.parseInt(product_id),
                userService.getMe());

        if (entity != null) {
            entity.setQuantity(entity.getQuantity() + userBasketDto.getQuantity());
            entity.setUpdatedAt(new TimeService().getTime());
            userBasketRepository.save(entity);
            return entity;
        } else {
            userBasketEntity userBasket = new userBasketEntity();
            userBasket.setUserId(userService.getMe());
            userBasket.setProductId(Integer.parseInt(product_id));
            userBasket.setQuantity(userBasketDto.getQuantity());
            userBasket.setCreatedAt(new TimeService().getTime());
            userBasket.setUpdatedAt(new TimeService().getTime());
            userBasketRepository.save(userBasket);
            return userBasket;
        }

    }

    /**
     * This function allow to modify the product quantity in user basket
     * @param : the 'product_id' to modify and it's new values as userBasketDto
     * @return : the product with the new quantity as userbasketEntity
     */
    public userBasketEntity patchProductFromUserBasket(String product_id, userBasketDto userBasketDto)
            throws NumberFormatException, ParseException {
        userBasketEntity entity = userBasketRepository.findByProductIdAndUserId(Integer.parseInt(product_id),
                userService.getMe());
        entity.setQuantity(userBasketDto.getQuantity());
        entity.setUpdatedAt(new TimeService().getTime());
        userBasketRepository.save(entity);
        return entity;
    }

    /**
     * This function allow to delete a product from user basket
     * @param : the 'product_id' to delete
     */
    public void deleteProductFromUserBasket(String product_id) throws NumberFormatException, ParseException {
        userBasketRepository.delete(
                userBasketRepository.findByProductIdAndUserId(Integer.parseInt(product_id), userService.getMe()));
    }

    /**
     * This function allow to get all product from database
     * @return : all products as userBasketEntity tab
     */
    public userBasketEntity[] getAllProducts() throws ParseException {
        return userBasketRepository.findByUserId(userService.getMe());
    }

    /**
     * This function allow to get product's quantity in the user basket
     * @param : the 'product_id'
     * @return : the product quantity as userBasketDto
     */
    public userBasketDto getAmountInUserBasket(String id) throws NumberFormatException, ParseException {
        userBasketDto item = new userBasketDto();
        item.setQuantity(userBasketRepository.findByProductIdAndUserId(Integer.parseInt(id), userService.getMe()).getQuantity());
        return item;
    }

    /**
     * This function allow to get the connected user username
     * @return : username
     */
    public usernameDto getUsername() {
        usernameDto user = new usernameDto();
        user.setUsername(userService.getUsername());
        return user;
    }

}
