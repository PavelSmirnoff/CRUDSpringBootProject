package dev.smirnoff.crudprojectspringboot.controller;

import dev.smirnoff.crudprojectspringboot.model.User;
import dev.smirnoff.crudprojectspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value = "/user")
    public String userPage(ModelMap model, Principal principal) {
        List<String> messages = new ArrayList<>();
        User user = userService.getUserByName(principal.getName());
        user.setFirstName(StringUtils.capitalize(user.getFirstName()));
        user.setLastName(StringUtils.capitalize(user.getLastName()));
        model.addAttribute("user", user);
        messages.add("Это Spring MVC приложение,");
        messages.add("Ты на своей персональной странице.");
        model.addAttribute("messages", messages);
        return "user";
    }

}