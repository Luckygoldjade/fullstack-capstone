-- Job Application Tracking System: PostgreSQL Schema with NOT NULL constraints
-- Author: Tony | Date: 4/26/2025
-- Time zone: EST
SET tIME ZONE "EST";

CREATE TABLE public.company (
  "company_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100),
    "url" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.jobs (
  "job_id" SERIAL PRIMARY KEY,
    "title" VARCHAR(100) NOT NULL,
    "salary" INTEGER,
    "benefits" TEXT,
    "location" VARCHAR(100),
    "url" TEXT,
    "description" TEXT,
    "date_posted" DATE NOT NULL,
    "company_id" INTEGER NOT NULL,
    "user_id" uuid NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_jobs_company_id"
      FOREIGN KEY ("company_id")
        REFERENCES "company"("company_id"),
    CONSTRAINT "fk_jobs_user_id" FOREIGN KEY ("user_id") REFERENCES auth.users(id));

CREATE TABLE public.usersjobs (
  "job_id" INTEGER NOT NULL,
    "user_id" uuid NOT NULL,
    "date_applied" DATE NOT NULL,
    "date_respond" DATE,
    "notes" TEXT,
    "job_status" VARCHAR(50) NOT NULL,
    PRIMARY KEY ("job_id", "user_id"),
    CONSTRAINT "fk_usersjobs_user_id"
      FOREIGN KEY ("user_id") REFERENCES auth.users(id),
    CONSTRAINT "fk_usersjobs_job_id"
      FOREIGN KEY ("job_id") REFERENCES public.jobs("job_id")
);

CREATE TABLE public.skills (
  "skill_id" SERIAL PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL
);

CREATE TABLE public.usersskills (
  "user_id" uuid NOT NULL,
  "skill_id" INTEGER NOT NULL,
  "rating" INTEGER NOT NULL,
  PRIMARY KEY ("user_id", "skill_id"),
  FOREIGN KEY ("user_id") REFERENCES auth.users(id),
  FOREIGN KEY ("skill_id") REFERENCES public.skills("skill_id")
);

CREATE TABLE public.jobsskills (
  "job_id" INTEGER NOT NULL,
  "skill_id" INTEGER NOT NULL,
  "rating" INTEGER NOT NULL,
  PRIMARY KEY ("job_id", "skill_id"),
  FOREIGN KEY ("job_id") REFERENCES public.jobs("job_id"),
  FOREIGN KEY ("skill_id") REFERENCES public.skills("skill_id")
);

CREATE TABLE public.tags (
  "tag_id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL
);

CREATE TABLE public.jobstags (
  "job_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  PRIMARY KEY ("job_id", "tag_id"),
  FOREIGN KEY ("job_id") REFERENCES public.jobs("job_id"),
  FOREIGN KEY ("tag_id") REFERENCES public.tags("tag_id")
);

CREATE TABLE public.contacts (
  "contact_id" SERIAL PRIMARY KEY,
  "user_id" uuid NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES auth.users(id)
);

CREATE TABLE public.authusers (
  "auth_id" SERIAL PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "auth_token" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "expires_at" TIMESTAMP, -- Optional: Token expiration date
  "status" VARCHAR(50) DEFAULT 'active', -- Optional: Token status (active, revoked)
  FOREIGN KEY ("user_id") REFERENCES auth.users(id)
);


-- Insert data into tables for testing purposes

-- Insert sample data into public.company
-- Reset sequence so next company_id will be 1
TRUNCATE public.company RESTART IDENTITY CASCADE;

INSERT INTO public.company ("name", "country", "url", "description") VALUES
('Generic Tech Inc.', 'USA', 'https://generictech.com', 'A technology company.'),
('Global Data Corp.', 'Canada', 'https://globaldata.com', 'A data analytics company.'),
('Universal Solutions Ltd.', 'UK', 'https://universalsolutions.com', 'A project management company.');

-- Replace these with real UUIDs from auth.users table
-- Assume: valid-looking fake UUIDs that follow PostgreSQL's UUID format rules.
-- John: '11111111-1111-1111-1111-111111111111'
-- Jane: '22222222-2222-2222-2222-222222222222'
-- Alex: '33333333-3333-3333-3333-333333333333'

-- Temporarily drop the constraint if you must insert test data
ALTER TABLE public.authusers DROP CONSTRAINT "fk_jobs_user_id";

-- Insert into public.authusers
INSERT INTO public.authusers ("user_id", "auth_token", "expires_at", "status") VALUES
('11111111-1111-1111-1111-111111111111', 'token123', '2025-12-31', 'active'),
('22222222-2222-2222-2222-222222222222', 'token456', '2025-12-31', 'active'),
('33333333-3333-3333-3333-333333333333', 'token789', '2025-12-31', 'revoked');

-- Temporarily drop the constraint if you must insert test data
ALTER TABLE public.jobs DROP CONSTRAINT "fk_jobs_user_id";

INSERT INTO public.jobs ("title", "salary", "benefits", "location", "url", "description", "date_posted", "company_id", "user_id")
VALUES
('Software Developer', 75000, 'Health Insurance, 401k', 'City A', 'https://example.com/job1', 'Develop and maintain software applications.', '2025-01-01', 1, '11111111-1111-1111-1111-111111111111'),
('Data Analyst', 65000, 'Health Insurance, Remote Work', 'Remote', 'https://example.com/job2', 'Analyze and interpret data.', '2025-02-01', 2, '22222222-2222-2222-2222-222222222222'),
('Project Manager', 85000, 'Health Insurance, PTO', 'City B', 'https://example.com/job3', 'Manage projects and coordinate teams.', '2025-03-01', 3, '33333333-3333-3333-3333-333333333333');

-- Insert into public.skills
INSERT INTO public.skills ("name") VALUES
('Python'), ('JavaScript'), ('SQL'),
('Project Management'), ('Data Analysis'), ('DevOps'), ('Networking');

-- Insert into public.tags
INSERT INTO public.tags ("name") VALUES
('Remote'), ('Full-Time'), ('Part-Time'), ('Contract'),
('Entry-Level'), ('Mid-Level'), ('Senior-Level'),
('Flexible Hours'), ('High Salary');

-- Insert into public.usersskills
INSERT INTO public.usersskills ("user_id", "skill_id", "rating") VALUES
('11111111-1111-1111-1111-111111111111', 1, 5),
('11111111-1111-1111-1111-111111111111', 3, 4),
('22222222-2222-2222-2222-222222222222', 2, 5),
('22222222-2222-2222-2222-222222222222', 4, 3),
('33333333-3333-3333-3333-333333333333', 5, 4),
('33333333-3333-3333-3333-333333333333', 6, 5);

-- Insert into public.jobsskills
INSERT INTO public.jobsskills ("job_id", "skill_id", "rating") VALUES
(1, 1, 5), (1, 3, 4),
(2, 2, 5), (2, 5, 4),
(3, 7, 5), (3, 4, 4);

-- Insert into public.jobstags
INSERT INTO public.jobstags ("job_id", "tag_id") VALUES
(1, 1), (1, 2),
(2, 3), (2, 4),
(3, 5), (3, 6);

-- Insert into public.usersjobs
INSERT INTO public.usersjobs ("job_id", "user_id", "date_applied", "date_respond", "notes", "job_status") VALUES
(1, '11111111-1111-1111-1111-111111111111', '2025-01-02', '2025-01-10', 'Phone screen completed.', 'Interviewing'),
(2, '22222222-2222-2222-2222-222222222222', '2025-02-03', NULL, 'Waiting for response.', 'Applied'),
(3, '33333333-3333-3333-3333-333333333333', '2025-03-05', '2025-03-10', 'Offer received.', 'Accepted');

-- Insert into public.contacts
INSERT INTO public.contacts ("user_id") VALUES
('11111111-1111-1111-1111-111111111111'),
('22222222-2222-2222-2222-222222222222'),
('33333333-3333-3333-3333-333333333333');


-- Re-add it later:
-- ALTER TABLE public.jobs ADD CONSTRAINT "FK_Jobs_user_id" FOREIGN KEY ("user_id") REFERENCES auth.users(id);



-- Jobs table test
-- All jobs
SELECT * FROM public.jobs;

-- Selected columns
SELECT "job_id", "title", "salary", "location", "date posted" FROM public.jobs;

-- Count jobs
SELECT COUNT(*) AS "total jobs" FROM public.jobs;

-- Total users in auth.users (run on Supabase separately)
SELECT COUNT(*) AS "total users" FROM auth.users;

-- Check jobs with invalid company_id
SELECT "job_id", "company_id"
FROM public.jobs
WHERE "company_id" NOT IN (SELECT "company_id" FROM public.company);

-- Check users without skills
SELECT "id" AS "user_id", "email"
FROM auth.users
WHERE "id" NOT IN (SELECT DISTINCT "user_id" FROM public.usersskills);

-- Jobs missing tags
SELECT "job_id", "title"
FROM public.jobs
WHERE "job_id" NOT IN (SELECT DISTINCT "job_id" FROM public.jobstags);

-- Duplicate auth tokens check
SELECT "auth_token", COUNT(*) AS "token_count"
FROM public.authusers
GROUP BY "auth_token"
HAVING COUNT(*) > 1;
