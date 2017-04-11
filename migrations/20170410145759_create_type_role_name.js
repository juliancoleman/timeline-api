exports.up = knex =>
  knex.schema.raw("CREATE TYPE role_name AS ENUM ('Parent', 'Student', 'Leader', 'Executive', 'Admin');");

exports.down = knex =>
  knex.schema.raw("DROP TYPE role_name");
