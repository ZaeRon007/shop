package com.shop.model.dto;

import com.shop.model.productEntity;

import lombok.Data;

@Data
public class productDto {
  String code;
  String name;
  String description;
  String image;
  String category;
  int price;

  public productDto(String code,
      String name,
      String description,
      String image,
      String category,
      int price) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.image = image;
    this.category = category;
    this.price = price;
  }

  public productEntity toProductEntity() {
    return new productEntity(code, name, description, image, category, price);
  }
}
