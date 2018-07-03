const db = require("../db/config")


module.exports = {

  findAll() {
    return db.query(`
    SELECT * FROM events
    ORDER BY event_start, event_end`);

  },


  findByDate(start, end) {
    return db.many(`
      SELECT * FROM events
      WHERE event_start >= $1 AND
      event_end <= $2 OR
      event_start <= $3 AND
      event_end >= $4
      ORDER BY event_start, event_end`,
      start,
      end,
      end,
      start,
    );
  },


  save(event) {
    return db.one(`
      INSERT INTO events
      (event_start, event_end, description)
      VALUES
      ($/event_start/, $/event_end/, $/description/)
      RETURNING *
      `, event);
  },

  destroy(id) {
    return db.query(`
      DELETE FROM events
      WHERE id = $1;
      SELECT * FROM events
      ORDER BY event_start, event_end
    `, id);
  },

   update(id, event) {
    return db.one(`
      UPDATE events
      SET
      event_start = $/event_start/,
      event_end = $/event_end/,
      description = $/description/
      WHERE id = ${id}
      RETURNING *
    `, event);
  },
};
