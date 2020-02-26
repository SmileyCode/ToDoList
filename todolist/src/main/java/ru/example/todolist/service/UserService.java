package ru.example.todolist.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.example.todolist.domain.User;
import ru.example.todolist.exception.UsernameExistException;
import ru.example.todolist.repository.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setConfirmPassword("");
            return userRepo.save(newUser);
        }
        catch (Exception e){
            throw new UsernameExistException("Username '" + newUser.getUsername() + "' already exist");
        }

    }
}
