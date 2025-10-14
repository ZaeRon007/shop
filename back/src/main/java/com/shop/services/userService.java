package com.shop.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.model.userEntity;
import com.shop.model.dto.userLogInDto;
import com.shop.model.dto.userRegisterDto;
import com.shop.repository.userRepository;

@Service
public class userService {
    
    @Autowired
    private userRepository userRepository;

    @Autowired 
    private JwtService jwtService;

    @Autowired
    PasswordEncoder PasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * create a new user from database
     * @param userRegisterDto a user to register
     * @return UserEntity the created user
     */
    public userEntity createUser(userRegisterDto userRegisterDto){
        userEntity userToAdd = new userEntity(userRegisterDto.getUsername(),
                                            userRegisterDto.getFirstname(),
                                            userRegisterDto.getEmail(),
                                            new TimeService().getTime());
                                                    
        userToAdd.setUpdatedAt(new TimeService().getTime());
        userToAdd.setPassword(PasswordEncoder.encode(userRegisterDto.getPassword()));
        return userToAdd;
    }

    /**
     * register a user to database
     * @param userRegisterDto user to register
     * @return the generated token for user
     */
    public String register(userRegisterDto userRegisterDto) {
        if(userRepository.existsByEmail(userRegisterDto.getEmail())){
            return "";
        }
        userEntity userToAdd = createUser(userRegisterDto);
        userRepository.save(userToAdd);
        
        return jwtService.generateToken(userToAdd);
    }

    /**
     * authenticate a user
     * @param userLoginDto user to authenticate
     * @return a new token for user
     */
    public String logIn(userLogInDto userLogInDto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogInDto.getEmail(), userLogInDto.getPassword()));
            userEntity userToLogIn = userRepository.findByEmail(userLogInDto.getEmail());
            userToLogIn.setUpdatedAt(new TimeService().getTime());
            userRepository.save(userToLogIn);

            return jwtService.generateToken(userToLogIn);
        } catch (Exception e) {
            System.out.printf("Exception: %s\n", e);
            return "";
        }
    }

    /**
     * get the authenticated user from database
     * @return the authenticated user
     * @throws ParseException
     */
    public int getMe() throws ParseException {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username).getId();
    }

    /**
     * return username of the connected user
     * @return
     */
    public String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    /**
     * Fonction permettant de vérifier que l'utilisateur est bien administrateur
     */
    public boolean canActivate(){
        return getUsername().equals("admin@admin.com");
    }
}