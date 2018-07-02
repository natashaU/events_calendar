const db = require("../db/config")


module.exports = {

  findAll() {
    return db.query(`
    SELECT * FROM events
    ORDER BY day_id, start_time`);

  },


  findById(id) {
    return db.many(`
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


  /*save(event) {
    return db.one(`
      INSERT INTO events
      (start_time, end_time, description, day_id)
      VALUES
      ($/start_time/, $/end_time/, $/description/, $/day_id/)
      RETURNING *
      `, event);
  },*/

  destroy(id) {
    return db.query(`
      DELETE FROM events
      WHERE id = $1;
      SELECT * FROM events
      ORDER BY day_id, start_time
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

   /*update(id, event) {
    return db.one(`
      UPDATE events
      SET
      start_time = $/start_time/,
      end_time = $/end_time/,
      description = $/description/
      WHERE id = ${id}
      RETURNING *
    `, event);
  },*/

};





