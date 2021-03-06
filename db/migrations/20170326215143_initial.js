
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.integer('following_count').nullable().defaultTo(0);
      table.integer('follower_count').nullable().defaultTo(0);
      table.timestamps(true, true);
    }),

    knex.schema.createTableIfNotExists('photos', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('id').inTable('profiles').onDelete('CASCADE');
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
      table.string('url').notNullable();
      table.integer('like_count').nullable();
      table.integer('comment_count').nullable();
      table.string('caption').nullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTableIfNotExists('comments', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('profile_id').references('id').inTable('profiles').onDelete('CASCADE');
      table.integer('photo_id').references('id').inTable('photos').onDelete('CASCADE');
      table.string('text').notNullable();
      table.timestamps(true, true);
    }),

    knex.schema.createTableIfNotExists('likes', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('photo_id').references('id').inTable('photos').onDelete('CASCADE');
      table.integer('profile_id').references('id').inTable('profiles').onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTableIfNotExists('friends', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('user_id').references('id').inTable('profiles').onDelete('CASCADE');
      table.integer('follower_id').references('id').inTable('profiles').onDelete('CASCADE');
      table.timestamps(true, true);
    }),

    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),

    knex.schema.createTableIfNotExists('chats', function(table) {
      table.increments('id').unsigned().primary();
      table.string('text', 255).notNullable();
      table.integer('send_id').references('profiles.id').onDelete('CASCADE');
      table.integer('receive_id').references('profiles.id').onDelete('CASCADE');
      table.boolean('read').nullable().defaultTo(false);
      table.timestamps(true, true);
    })

  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('likes'),
    knex.schema.dropTable('comments'),
    knex.schema.dropTable('photos'),
    knex.schema.dropTable('friends'),
    knex.schema.dropTable('profiles'),
    knew.schema.dropTable('chats')
  ]);
};

