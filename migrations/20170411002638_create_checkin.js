exports.up = knex =>
  knex.schema.createTable("checkin", (table) => {
    table.increments();
    table.integer("role_camp_id");
    table.integer("itinerary_id");
    table.timestamps();
    table.timestamp("deleted_at");
  });

exports.down = knex =>
  knex.schema.dropTable("checkin");
