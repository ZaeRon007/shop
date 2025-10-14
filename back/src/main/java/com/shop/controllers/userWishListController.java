package com.shop.controllers;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.services.userWishListService;

@RestController
@RequestMapping("/shop/wishs")
public class userWishListController {
    @Autowired
    userWishListService userWishListService;

    @GetMapping("")
    public ResponseEntity<?> getAllProductsFromBasket() throws ParseException{
        return ResponseEntity.ok().body(userWishListService.getAllProducts());
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> addProductToUserWishList(@PathVariable String id) throws NumberFormatException, ParseException{
        return ResponseEntity.ok().body(userWishListService.addProductToUserWishList(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductFromUserWishList(@PathVariable String id) throws NumberFormatException, ParseException{
        userWishListService.deleteProductFromUserWishList(id);
        return ResponseEntity.ok().body(null);
    }
}
