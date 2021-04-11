package kz.javaee.codenames.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserDto implements Serializable {

    private String email;

    private String username;

    private String password;

    private String fullName;

    private String oldPassword;

    private String newPassword;

}
