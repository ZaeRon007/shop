package com.shop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.dto.productDto;
import com.shop.services.productService;

@RestController
@RequestMapping("/products")
public class productController {
    @Autowired
    productService productService;

    @PostMapping("")
    public ResponseEntity<?> createProduct(@RequestBody productDto product){
        return ResponseEntity.ok().body(productService.create(product));
    } 

    @GetMapping("")
    public ResponseEntity<?> getProducts(){
        return ResponseEntity.ok().body(productService.getProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable String id){
        return ResponseEntity.ok().body(productService.getProduct(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchProduct(@PathVariable String id, @RequestBody productDto product){
        return ResponseEntity.ok().body(productService.patchProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id){
        productService.deleteProduct(id);
        return ResponseEntity.ok().body(null);
    }
}
