package com.shop.model;

import com.shop.model.dto.userInfosDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "users", uniqueConstraints =  {@UniqueConstraint(columnNames = "email")})
@NoArgsConstructor
public class userEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "createdAt")
    private String createdAt;

    @Column(name = "updatedAt")
    private String updatedAt;

    public userEntity(String username, String firstname, String email, String createdAt){
        this.username = username;
        this.firstname = firstname;
        this.email = email;
        this.createdAt = createdAt;
    }

    public userInfosDto toUserInfosDto(){
        userInfosDto res = new userInfosDto();
        res.setId(id);
        res.setEmail(email);
        res.setUsername(username);
        res.setFirstname(firstname);
        return res;
    }
}