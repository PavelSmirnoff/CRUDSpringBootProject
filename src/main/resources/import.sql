INSERT INTO users(id, first_name, last_name, birth_date, tel_number, password) VALUES (1, 'admin', 'adminych', '25.08.1991', 89778000101, 'admin');
INSERT INTO users(id, first_name, last_name, birth_date, tel_number, password) VALUES (2, 'user', 'mihaylovich', '01.09.2012', 89778000102, 'user');
INSERT INTO role(id, name) VALUES (1, 'ROLE_ADMIN'),(2, 'ROLE_USER');
INSERT INTO users_roles(User_id, roles_id) VALUES (1, 1);
INSERT INTO users_roles(User_id, roles_id) VALUES (1, 2);
INSERT INTO users_roles(User_id, roles_id) VALUES (2, 2);