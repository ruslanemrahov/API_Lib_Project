/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("authors", (table) => {
      table.increments("id").primary();
      table.string("author").notNullable();
      table.timestamps(true, true);
    })
    .then(() => {
      return knex.schema.createTable("books", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table
          .integer("author_id")
          .unsigned()
          .references("id")
          .inTable("authors")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        table.timestamps(true, true);
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("books")
    .then(() => knex.schema.dropTableIfExists("authors"));
};
