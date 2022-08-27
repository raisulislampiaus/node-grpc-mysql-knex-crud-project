exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'book', price: '66.79' },
        { name: 'phone', price: '25.66' },
        { name: 'pant', price: '26.66' },
        { name: 'wallet', price: '25.66' },
        { name: 'phone', price: '25.66' },
      ]);
    });
};
