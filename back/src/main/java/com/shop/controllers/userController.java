package com.shop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.dto.userInfosDto;
import com.shop.model.dto.userLogInDto;
import com.shop.model.dto.userRegisterDto;
import com.shop.model.response.simpleToken;
import com.shop.services.userService;

@RestController
@RequestMapping("/auth")
public class userController {
    
    @Autowired
    public userService userService;

    @PostMapping("/register")
    public ResponseEntity<?> userRegister(@RequestBody userRegisterDto userRegisterDto){
        String token = userService.register(userRegisterDto);

        if(token.isEmpty())
            return ResponseEntity.badRequest().body("Username already exist !!");

        return ResponseEntity.ok().body(new simpleToken(token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> userLogIn(@RequestBody userLogInDto userLogInDto){
        String token = userService.logIn(userLogInDto);

        if(token.isEmpty())
            return ResponseEntity.badRequest().body("email or password is invalid !!");

        return ResponseEntity.ok().body(new simpleToken(token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(){
        userInfosDto userInfosDto = userService.getUserInfos();

        if(userInfosDto.getEmail().isEmpty())
            return ResponseEntity.badRequest().body("something went wrong with database");
        return ResponseEntity.ok().body(userInfosDto);
    }
}
