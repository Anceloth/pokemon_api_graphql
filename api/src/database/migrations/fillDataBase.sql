CREATE TABLE information_schema.users (
	id serial NOT NULL,
	status public."users_status_enum" NULL,
	create_at timestamp NOT NULL,
	update_at timestamp NOT NULL,
	user_name varchar(50) NULL,
	"name" varchar(50) NULL,
	"password" varchar(250) NULL,
	is_active bool NOT NULL
);