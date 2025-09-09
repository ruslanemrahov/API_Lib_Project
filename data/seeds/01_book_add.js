/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("books").del();
  await knex("authors").del();

  await knex("authors").insert([
    { id: 1, author: "J.K. Rowling" },
    { id: 2, author: "Johann Wolfgang von Goethe" },
    { id: 3, author: "QQ" },
  ]);

  await knex("books").insert([
    { id: 1, title: "Harry Potter and the Philosopher's Stone", author_id: 1 },
    { id: 2, title: "Harry Potter and the Chamber of Secrets", author_id: 1 },
    { id: 3, title: "A Game of Thrones", author_id: 2 },
    { id: 4, title: "A Clash of Kings", author_id: 2 },
    { id: 5, title: "The Fellowship of the Ring", author_id: 3 },
    { id: 6, title: "The Two Towers", author_id: 3 },
  ]);
};
