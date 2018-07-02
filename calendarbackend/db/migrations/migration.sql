\c calendarapp



CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  event_start TIMESTAMP WITH TIME ZONE,
  event_end TIMESTAMP WITH TIME ZONE,
  description VARCHAR(64)
);
