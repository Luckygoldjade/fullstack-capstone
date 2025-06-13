# CS467

Capstone Project Demo — Full-Stack Web App

A brief demo of my senior capstone project: a full-stack web application built with Node.js, Express, and PostgreSQL.

Stack: JavaScript · Express · PostgreSQL · SQL · Supabase (if used)
PDF Report: [link]
GitHub Repo: https://github.com/Luckygoldjade/fullstack-capstone.git
Demo on render: TBD

Features:

User login & role-based access

API and database integration

Responsive UI

Originally developed for my B.S. in Computer Science (2025) at Oregon State University



# Instructions on running the app:

#### Clone the repo with the command:
-  git clone https://github.com/Luckygoldjade/fullstack-capstone.git
-  git pull origin main

#### To run the app
- Change the working directory to the Backend folder with the command:
  - cd Backend/
- Install all the dependencies with the command:
  - npm install
- Create an .env in the Backend folder with the filled variables PORT, SUPABASE_URL, and SUPABASE_ANON_KEY.
- A dot_env example is in docs/ directory.
- Start the server while within the Backend folder with the command:
  - node app.js

#### Routes

Home page - / <br>
Users are able to login, register, and signout
After a successful login, the user is redirected to /dashboard

Dashboard page - /dashboard <br>
Users can view their jobs, contacts, and skills. User can currently click view all jobs to be redirected to the applications page /jobs where they can see all their jobs

Jobs page - /jobs <br>
Users can view all their jobs as well as edit and delete them

Job Entry page - /jobs/create <br>
User can add a new job

Job Skill page - /jobsskills <br>
Users can view, add, edit,and delete skills related to their applied jobs

User Skill page - /skills <br>
Users can view, add, edit,and delete skills related to their own jobs

Contacts page - /contacts <br>
Users can view, add, edit,and delete contacts
