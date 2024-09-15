
-- Execute these queries to create the requisite tables.

-- After login, another table will be created called "session"
-- This is managed by passport.

-- Note: No seed data is currently supplied for this project.

-- Database name: StoryBoard

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"project_name" VARCHAR (100),
	"user_id" INTEGER REFERENCES "user" ON DELETE CASCADE
);

CREATE TABLE "added_cards" (
	"id" SERIAL PRIMARY KEY,
	"project_id" INTEGER REFERENCES "projects" ON DELETE CASCADE,
	"x" INTEGER DEFAULT 1,
	"y" INTEGER DEFAULT 1,
	"w" INTEGER DEFAULT 1,
	"h" INTEGER DEFAULT 1,
	"bg_color" VARCHAR(50),
	"card_type" VARCHAR(200),
	"card_settings" JSONB,
	"card_header" VARCHAR(500)
);
