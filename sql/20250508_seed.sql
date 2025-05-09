INSERT INTO userTypes (title, description) VALUES ('admin', 'Administrator'), ('tetcher', 'Tetcher'), ('student', 'Student');
INSERT INTO
    `users` (
        user_id,
        email,
        password,
        first_name,
        last_name,
        user_type_id
    )
VALUES
    (
        1,
        'admin@',
        '$2a$12$7nRDbTVBJQQvzNeGA3XGdOdBeuFoK6Ivs8Sk1IKdth5jzbeqQfDdC',
        'admin',
        'admin',
        1
    );