\c calendarapp



CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  start_time VARCHAR(255),
  end_time VARCHAR(255),
  description TEXT,
  day_id INTEGER
);
