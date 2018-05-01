const db = require("../db/config")


module.exports = {

  findAll() {
    return db.query(`
    SELECT * FROM events
    ORDER BY day_id, start_time`);
    ;
  },


  findById(id) {
    console.log('were in the backend' + id)
    return db.many(`
      SELECT * FROM events
      WHERE day_id = $1
      ORDER BY start_time
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
