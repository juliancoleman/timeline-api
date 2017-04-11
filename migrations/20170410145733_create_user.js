exports.up = knex =>
  knex.schema.createTable("user", (table) => {
    table.increments();
    table.string("first_name");
    table.string("last_name");
    table.string("campus");
    table.string("home_address");
    table.string("email_address");
    table.string("phone_number");
    table.string("emergency_contact_name");
    table.string("emergency_contact_number");
    table.string("emergency_contact_relationship");
    table.string("allergies");
    table.integer("barcode_number");
    table.string("encrypted_password");
    table.timestamps();
    table.timestamp("deleted_at");
  });

exports.down = knex =>
  knex.schema.dropTable("user");
