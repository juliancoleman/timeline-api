exports.up = knex =>
  knex.schema.createTable("camp", (table) => {
    table.increments();
    table.string("type");
    table.string("campus");
    table.integer("bus_number");
    table.timestamps();
    table.timestamp("deleted_at");
  });

exports.down = knex =>
  knex.schema.dropTable("camp");
