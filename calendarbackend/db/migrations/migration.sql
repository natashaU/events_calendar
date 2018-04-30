\c calendarapp



CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  start_time VARCHAR(8),
  end_time VARCHAR(8),
  description TEXT,
  day_id INTEGER
);
