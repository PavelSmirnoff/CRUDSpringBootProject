package dev.smirnoff.crudprojectspringboot.service;

import dev.smirnoff.crudprojectspringboot.model.Role;

import java.util.List;

/**
 * @author pavelsmirnov
 * @version 1.0
 * дата создания 02.03.2021
 */
public interface RoleService {
    void createRole(Role role);
    void deleteRole(Long id);
    List<Role> getRoles();
    Role getRoleById(Long id);
}
