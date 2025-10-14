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

    public userBasketEntity patchProductFromUserBasket(String product_id, userBasketDto userBasketDto)
            throws NumberFormatException, ParseException {
        userBasketEntity entity = userBasketRepository.findByProductIdAndUserId(Integer.parseInt(product_id),
                userService.getMe());
        entity.setQuantity(userBasketDto.getQuantity());
        entity.setUpdatedAt(new TimeService().getTime());
        userBasketRepository.save(entity);
        return entity;
    }

    public void deleteProductFromUserBasket(String product_id) throws NumberFormatException, ParseException {
        userBasketRepository.delete(
                userBasketRepository.findByProductIdAndUserId(Integer.parseInt(product_id), userService.getMe()));
    }

    public userBasketEntity[] getAllProducts() throws ParseException {
        return userBasketRepository.findByUserId(userService.getMe());
    }

    public userBasketDto getAmountInUserBasket(String id) throws NumberFormatException, ParseException {
        userBasketDto item = new userBasketDto();
        item.setQuantity(userBasketRepository.findByProductIdAndUserId(Integer.parseInt(id), userService.getMe()).getQuantity());
        return item;
    }

    public usernameDto getUsername() {
        usernameDto user = new usernameDto();
        user.setUsername(userService.getUsername());
        return user;
    }

}
