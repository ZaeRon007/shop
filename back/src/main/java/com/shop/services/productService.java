package com.shop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.productEntity;
import com.shop.model.dto.productDto;
import com.shop.repository.productRepository;

@Service
public class productService {

    @Autowired
    productRepository productRepository;

    @Autowired
    userService userService;

    /**
     * This function allow to create a new product
     * @param : the 'product' informations
     * @return : the new product as productEntity
     */
    public productEntity create(productDto product) {
        if (userService.canActivate()) {
            productEntity productToAdd = new productEntity();
            productToAdd = product.toProductEntity();
            productToAdd.setCreatedAt(new TimeService().getTime());
            productToAdd.setUpdatedAt(new TimeService().getTime());
            productToAdd = randomize(productToAdd);

            return productRepository.save(productToAdd);
        } else
            return null;
    }

    /**
     * This function allow to randomize a product quantity and it's rating
     * @param : the 'product' to modify
     * @return : the new product as productEntity
     */
    private productEntity randomize(productEntity product) {
        double randomQuantity = Math.random() * 300;
        product.setQuantity((int) randomQuantity);
        product.setInternalReference("REF-123-456");
        product.setShellId(15);
        if (randomQuantity == 0)
            product.setInventoryStatus(productEntity.inventoryStatusEnumeration.OUTOFSTOCK);
        else if (randomQuantity <= 5)
            product.setInventoryStatus(productEntity.inventoryStatusEnumeration.LOWSTOCK);
        else
            product.setInventoryStatus(productEntity.inventoryStatusEnumeration.INSTOCK);

        double randomRating = Math.random() * 15;
        product.setRating((int) randomRating);

        return product;
    }

    /**
     * This function allow to get all products
     * @return : all products as a Iterable<productEntity>
     */
    public Iterable<productEntity> getProducts() {
        return productRepository.findAll();
    }

    /**
     * This function allow to get a product
     * @param : the 'product_id' to get
     * @return : the product as productEntity
     */
    public productEntity getProduct(String id) {
        return productRepository.findById(Integer.parseInt(id));
    }

    /**
     * This function allow to modify a product
     * @param : the 'product_id' and it's new informations as productDto
     * @return : the new product as productEntity
     */
    public productEntity patchProduct(String id, productDto product) {
        if (userService.canActivate()) {

            productEntity productToPatch = productRepository.findById(Integer.parseInt(id));
            productToPatch.setCode(product.getCode());
            productToPatch.setName(product.getName());
            productToPatch.setDescription(product.getDescription());
            productToPatch.setImage(product.getImage());
            productToPatch.setCategory(product.getCategory());
            productToPatch.setPrice(product.getPrice());
            productToPatch.setId(Integer.parseInt(id));
            productToPatch.setUpdatedAt(new TimeService().getTime());
            productRepository.save(productToPatch);

            return productToPatch;
        } else
            return null;
    }

    /**
     * This function allow to delete a product from database
     * @param : the 'product_id' to delete
     */
    public void deleteProduct(String id) {
        if (userService.canActivate()) {
            productRepository.deleteById(Integer.parseInt(id));
        }

    }

}
