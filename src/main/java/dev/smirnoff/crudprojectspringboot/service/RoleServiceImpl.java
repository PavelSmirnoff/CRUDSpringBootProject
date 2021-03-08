package dev.smirnoff.crudprojectspringboot.service;

import dev.smirnoff.crudprojectspringboot.dao.RoleDao;
import dev.smirnoff.crudprojectspringboot.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author pavelsmirnov
 * @version 1.0
 * дата создания 02.03.2021
 */
@Service
@Transactional
public class RoleServiceImpl implements RoleService{
    private RoleDao roleDao;

    @Autowired
    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Override
    //@Transactional
    public void createRole(Role role) {
        roleDao.createRole(role);
    }

    @Override
    //@Transactional
    public void deleteRole(Long id) {
        roleDao.deleteRole(id);
    }

    @Override
    //@Transactional
    public List<Role> getRoles() {
        return roleDao.getRoles();
    }

    @Override
    //@Transactional
    public Role getRoleById(Long id) {
        return roleDao.getRoleById(id);
    }
}
