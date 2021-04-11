package kz.javaee.codenames.services;

import kz.javaee.codenames.models.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    User addUser(String email, String username, String password, String fullName);

    User getUserByEmail(String email);

    User getUserByUsername(String username);

    User updateUserData(User user);

}
