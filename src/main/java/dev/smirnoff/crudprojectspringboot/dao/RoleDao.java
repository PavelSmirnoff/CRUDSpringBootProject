package dev.smirnoff.crudprojectspringboot.dao;


import dev.smirnoff.crudprojectspringboot.model.Role;

import java.util.List;

/**
 * @author pavelsmirnov
 * @version 1.0
 * дата создания 02.03.2021
 */
public interface RoleDao {
    void createRole(Role role);
    void deleteRole(Long id);
    Role getRoleById(Long id);
    List<Role> getRoles();
}
