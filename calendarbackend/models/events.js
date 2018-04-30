const db = require("../db/config")


module.exports = {

  findAll() {
    return db.query(`SELECT * FROM events`);
  },

  findById(id) {
    return db.one(`
      SELECT * FROM events
      WHERE day_id = $1;
      `, id);
  },

   save(event) {
    return db.one(`
      INSERT INTO events
      (start_time, end_time, description, day_id)
      VALUES
      ($/start_time/, $/end_time/, $/description/, $/day_id/)
      RETURNING *
      `, event);
  },


  destroy(id) {
    return db.none(`
    DELETE
    FROM events
    WHERE id = $1
    `, id);
  },
};
