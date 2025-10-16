package com.shop.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shop.model.dto.userInfosDto;
import com.shop.model.dto.userLogInDto;
import com.shop.model.dto.userRegisterDto;
import com.shop.model.response.simpleToken;
import com.shop.services.userService;

@RestController
public class userController {

    @Autowired
    public userService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> userRegister(@RequestBody userRegisterDto userRegisterDto) {
        String token = userService.register(userRegisterDto);

        if (token.isEmpty())
            return ResponseEntity.badRequest().body("Username already exist !!");

        return ResponseEntity.ok().body(new simpleToken(token));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> userLogIn(@RequestBody userLogInDto userLogInDto) {
        String token = userService.logIn(userLogInDto);

        if (token.isEmpty())
            return ResponseEntity.badRequest().body("email or password is invalid !!");

        return ResponseEntity.ok().body(new simpleToken(token));
    }

    @GetMapping("/profile/me")
    public ResponseEntity<?> getMe() {
        userInfosDto userInfosDto = userService.getUserInfos();

        if (userInfosDto.getEmail().isEmpty())
            return ResponseEntity.badRequest().body("something went wrong with database");
        return ResponseEntity.ok().body(userInfosDto);
    }

    @PutMapping("/profile/me")
    public ResponseEntity<?> putMe(@RequestBody userInfosDto user){
        userInfosDto res = userService.putUserInfos(user);
        return ResponseEntity.ok().body(res);
    }
}
