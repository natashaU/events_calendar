\c calendarapp



CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  start TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  description VARCHAR(64)
);
