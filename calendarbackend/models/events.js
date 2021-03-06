const db = require("../db/config")


module.exports = {

  findAll() {
    return db.query(`
    SELECT * FROM events
    ORDER BY day_id, start_time`);

  },


  findById(id) {
    return db.query(`
      SELECT * FROM events
      WHERE day_id = $1
      ORDER BY start_time
      `, id);
  },

   save(event) {
    return db.many(`
      INSERT INTO events
      (start_time, end_time, description, day_id)
      VALUES
      ($/start_time/, $/end_time/, $/description/, $/day_id/);
      SELECT * FROM events
      WHERE day_id = $/day_id/
      ORDER BY start_time
      `, event);
  },

  destroy(id) {
    return db.none(`
      DELETE FROM events
      WHERE id = $1
      `, id);
  },

  update(id, event) {
    return db.many(`
      UPDATE events
      SET
      start_time = $/start_time/,
      end_time = $/end_time/,
      description = $/description/
      WHERE id = ${id};
      SELECT * FROM events
      WHERE day_id = $/day_id/
      ORDER BY start_time
    `, event);
  },

};





