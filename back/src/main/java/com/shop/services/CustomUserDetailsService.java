package com.shop.services;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.shop.model.userEntity;
import com.shop.repository.userRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    @Autowired
    userRepository userRepository;

    /**
     * load a user from database by it's email
     * @param email
     * @return UserDetails
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        userEntity user = userRepository.findByEmail(email);

        if(user == null){
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
        return new User(user.getEmail(), 
                        user.getPassword(), 
                        new ArrayList<>()); 
    }
}
