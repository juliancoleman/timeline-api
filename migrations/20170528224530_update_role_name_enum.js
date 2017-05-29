exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.raw("ALTER TYPE role_name ADD VALUE 'Small Group Leader';"),
    knex.schema.raw("ALTER TYPE role_name ADD VALUE 'Campus Leader';"),
  ]);

exports.down = (knex, Promise) =>
  Promise.resolve(); // No down step because enums cannot be reverted
