const db = require('../');
const knex = require('../knex.js');

const Photo = db.Model.extend({
  tableName: 'photos',
  profile: function() {
    return this.belongsTo('profile');
  }
});

class PhotoQueries {

  incrementPostCount(userID) {
    let query = `update profiles set post_count = post_count + 1 where id = ${userID}`;

    return knex.raw(query);
  }


  getPhotoLikesForUser(userID) {
    let query = `select * from likes where profile_id = ${userID}`;

    return knex.raw(query);
  }

  getPhotos(numOfPhotos, userID) {
    let query;

    if (numOfPhotos) {
      //run this if num of photos is not undefined

      query = `select pro.first, p.*, age(current_date + current_time, p.created_at) as "age", pro.photo as "profile_photo" from photos p join profiles pro on p.profile_id = pro.id order by created_at desc limit ${numOfPhotos}`;
    } else if (userID) {
      //run this if num of photos is undefined and user id is undefined
      query = `select pro.first, p.*, age(current_date + current_time, p.created_at) as "age", pro.photo as "profile_photo" from photos p join profiles pro on p.profile_id = pro.id where p.profile_id = ${userID} order by created_at desc`;
    } else {
      //run this if numof photos is undefined and user id is defined
      query = `select pro.first, p.*, age(current_date + current_time, p.created_at) as "age", pro.photo as "profile_photo" from photos p join profiles pro on p.profile_id = pro.id order by created_at desc`;
     
    }
    return knex.raw(query);
  }

  getProfilePhotos(userID) {
    let query = `select pro.first, p.*, age(current_date + current_time, p.created_at) as "age", pro.photo as "profile_photo" from photos p join profiles pro on p.profile_id = pro.id where p.profile_id = ${userID} order by created_at desc`;
    
    return knex.raw(query); 
  }

}


module.exports = db.model('Photo', Photo);
module.exports.PhotoQueries = new PhotoQueries();
