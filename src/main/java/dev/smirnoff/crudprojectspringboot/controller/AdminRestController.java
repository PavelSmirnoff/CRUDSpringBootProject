package dev.smirnoff.crudprojectspringboot.controller;

import dev.smirnoff.crudprojectspringboot.model.Role;
import dev.smirnoff.crudprojectspringboot.model.User;
import dev.smirnoff.crudprojectspringboot.service.RoleService;
import dev.smirnoff.crudprojectspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author pavelsmirnov
 * @version 1.0
 * дата создания 13.03.2021
 */
@RestController
@RequestMapping("/admin")
public class AdminRestController {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/alluser")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(this.userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/allrole")
    public ResponseEntity<List<Role>> getRoles() {
        return new ResponseEntity<>(this.roleService.getRoles(), HttpStatus.OK);
    }
    @GetMapping("/delrole/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        this.roleService.deleteRole(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/add_role")
    public ResponseEntity<Void> addRole(@RequestBody Role role) {
        this.roleService.createRole(role);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
