INSERT INTO tb_roles (role_id, name)
VALUES (1, 'ADMIN'), (2, 'BASIC')
ON CONFLICT (role_id) DO NOTHING;

INSERT INTO tb_permissions (permission_id, name)
VALUES 
(1, 'ALL_ACCESS'), 
(2, 'VIEW_DASHBOARD'),  
(3, 'UPDATE_USER'), 
(4, 'DELETE_USER'), 
(5, 'ADD_USER'), 
(6, 'GET_USERS'), 
(7, 'UPDATE_PASSWORD_USER'),
(8, 'GET_ROLES')
ON CONFLICT (permission_id) DO NOTHING;

INSERT INTO tb_role_permissions (role_id, permission_id)
VALUES (1, 1), (2, 2), (2, 6) ON CONFLICT (role_id, permission_id) DO NOTHING;
