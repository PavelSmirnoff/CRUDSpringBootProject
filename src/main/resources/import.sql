INSERT INTO users(id, first_name, password) VALUES (1, 'admin', 'admin');
INSERT INTO role(id, name) VALUES (1, 'ROLE_ADMIN'), (2, 'ROLE_USER');
INSERT INTO users_roles(User_id, roles_id) VALUES (1, 1);