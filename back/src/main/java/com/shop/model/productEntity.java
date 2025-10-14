package com.shop.model;

import com.shop.model.dto.productDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "products")
@NoArgsConstructor
public class productEntity {
  public enum inventoryStatusEnumeration {
    INSTOCK,
    LOWSTOCK,
    OUTOFSTOCK
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "code")
  private String code;

  @Column(name = "name")
  private String name;

  @Column(name = "description", length = 2000)
  private String description;

  @Column(name = "image")
  private String image;

  @Column(name = "category")
  private String category;

  @Column(name = "price")
  private int price;

  @Column(name = "quantity")
  private int quantity;

  @Column(name = "internal_reference")
  private String internalReference;

  @Column(name = "shell_id")
  private int shellId;

  @Enumerated(EnumType.STRING)
  @Column(name = "inventory_status")
  private inventoryStatusEnumeration inventoryStatus;

  @Column(name = "rating")
  private int rating;

  @Column(name = "created_at")
  private String createdAt;

  @Column(name = "updated_at")
  private String updatedAt;

  public productDto toProductDto() {
    return new productDto(this.getCode(),
        this.getName(),
        this.getDescription(),
        this.getImage(),
        this.getCategory(),
        this.getPrice());
  }

  public productEntity(String code, String name, String description, String image, String category, int price) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.image = image;
    this.category = category;
    this.price = price;
  }
}
