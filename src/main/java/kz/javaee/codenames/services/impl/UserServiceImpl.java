package kz.javaee.codenames.services.impl;

import kz.javaee.codenames.models.Role;
import kz.javaee.codenames.models.User;
import kz.javaee.codenames.repositories.RoleRepository;
import kz.javaee.codenames.repositories.UserRepository;
import kz.javaee.codenames.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User addUser(String email, String username, String password, String fullName) {
        User checkUserEmail = userRepository.findByEmail(email);
        User checkUserUsername = userRepository.findByUsername(username);

        if (checkUserUsername == null && checkUserEmail == null) {
            User user = new User();
            user.setEmail(email);
            user.setUsername(username);
            user.setPassword(password);
            user.setFullName(fullName);

            Role role = roleRepository.findByName("user");

            if (role != null) {
                List<Role> roles = new ArrayList<>();
                roles.add(role);
                user.setRoles(roles);
                user.setPassword(passwordEncoder.encode(password));
                return userRepository.save(user);
            }
        }

        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User updateUserData(User user) {
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(s);

        if (user != null) {
            return user;
        }

        user = userRepository.findByUsername(s);

        System.out.println(user.getUsername() + " " + user.getFullName());

        if (user != null) {
            return user;
        }

        throw new UsernameNotFoundException("USER NOT FOUND");
    }
}
