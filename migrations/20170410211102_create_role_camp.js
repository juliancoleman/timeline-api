exports.up = knex =>
  knex.schema.createTable("role_camp", (table) => {
    table.increments();
    table.integer("role_id");
    table.integer("camp_id");
    table.timestamps();
    table.timestamp("deleted_at");
  });

exports.down = knex =>
  knex.schema.dropTable("role_camp");
