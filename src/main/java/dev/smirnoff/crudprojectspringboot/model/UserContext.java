package dev.smirnoff.crudprojectspringboot.model;

/**
 * @author pavelsmirnov
 * @version 1.0
 * дата создания 14.03.2021
 */
public class UserContext{
    private User user;
    private String[] role;
    // getters and setters

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String[] getRole() {
        return role;
    }

    public void setRole(String[] role) {
        this.role = role;
    }
}
