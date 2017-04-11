exports.up = knex =>
  knex.schema.createTable("itinerary", (table) => {
    table.increments();
    table.integer("camp_id");
    table.string("location");
    table.timestamp("event_date");
    table.timestamps();
    table.timestamp("deleted_at");
  });

exports.down = knex =>
  knex.schema.dropTable("itinerary");
