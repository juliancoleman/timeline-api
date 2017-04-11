exports.up = knex =>
  knex.schema.createTable("role", (table) => {
    table.increments();
    table.integer("user_id");
    table.specificType("name", "role_name");
    table.timestamps();
    table.timestamp("deleted_at");
  });

exports.down = knex =>
  knex.schema.dropTable("role");
