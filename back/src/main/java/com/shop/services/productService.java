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

    private productEntity randomize(productEntity product) {
        double randomQuantity = Math.random() * 300;// nombre aléatoire entre 0 et 299
        product.setQuantity((int) randomQuantity);
        product.setInternalReference("REF-123-456");
        product.setShellId(15);
        if (randomQuantity == 0)
            product.setInventoryStatus(productEntity.inventoryStatusEnumeration.OUTOFSTOCK);
        else if (randomQuantity <= 5)
            product.setInventoryStatus(productEntity.inventoryStatusEnumeration.LOWSTOCK);
        else
            product.setInventoryStatus(productEntity.inventoryStatusEnumeration.INSTOCK);

        double randomRating = Math.random() * 15;// nombre aléatoire entre 0 et 15
        product.setRating((int) randomRating);

        return product;
    }

    public Iterable<productEntity> getProducts() {
        return productRepository.findAll();
    }

    public productEntity getProduct(String id) {
        return productRepository.findById(Integer.parseInt(id));
    }

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

    public void deleteProduct(String id) {
        if (userService.canActivate()) {
            productRepository.deleteById(Integer.parseInt(id));
        }

    }

}
