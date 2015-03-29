#!/bin/sh

cat db/schema/create_database_dev.sql | mysql -u root
cat db/schema/users.sql | mysql -u root
cat db/schema/test_data.sql | mysql -u root
