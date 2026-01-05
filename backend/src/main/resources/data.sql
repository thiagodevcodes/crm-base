INSERT INTO tb_roles (role_id, name)
VALUES (1, 'ADMIN'), (2, 'BASIC')
ON CONFLICT (role_id) DO NOTHING;

INSERT INTO tb_permissions (permission_id, name)
VALUES (1, 'ALL_ACCESS'), (2, 'VIEW_DASHBOARD'), (3, 'MANAGE_USERS')
ON CONFLICT (permission_id) DO NOTHING;

INSERT INTO tb_role_permissions (role_id, permission_id)
VALUES (1, 1), (2, 2) ON CONFLICT (role_id, permission_id) DO NOTHING;
