exports.up = knex =>
  knex.schema.createTable("family", (table) => {
    table.increments();
    table.timestamps();
    table.timestamp("deleted_at");
  });

exports.down = knex =>
  knex.schema.dropTable("family");
