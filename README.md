# Capstone Project: Job Tracker App called Jobscript

Jobscript is a web-based application designed to streamline job hunting by helping users organize and manage their career pursuits in one centralized platform. Jobscript provides tools to track applications, maintain networking contacts, and monitor growth in key technical skills. Its intuitive layout and targeted features make it ideal for job seekers who want a clearer view of their progress and greater control over their career planning.

This repository contains my independent copy of a collaborative capstone project completed as part of the Computer Science program at Oregon State University.

## Project Overview

GitHub Repo: https://github.com/Luckygoldjade/fullstack-capstone.git
Working Demo on render: https://cs467-dvfe.onrender.com/

## Demo Video - Capstone Project Demo — Full-Stack Web App

A brief demo of my senior capstone project: a full-stack web application built with Node.js, Express, and PostgreSQL.
Watch the full walkthrough on YouTube: https://youtu.be/I9GOijkri-I

## Final Report

Final Report: [View Final Report (PDF)](docs/cs467_jobscript_kuang_jaeger_chan_final_report_060425_v01.pdf)

## Features:

User authentication and role-based access control
Dynamic data display from PostgreSQL
RESTful API integration
CRUD operations with input validation

## Collaborators

This project was originally developed in collaboration with teammates Jacky Kuang, Katherine Jaeger, and myself. 
This repo is a personalized, independently maintained version created for portfolio and resume purposes.

## Tech Stack

Frontend: HTML/CSS/JavaScript
Backend: Node.js, Express
Database: PostgreSQL (via Supabase)

### Instructions on running the app:

Installation and Instructions: [Installation and Instructions (PDF)](docs/cs467_jobscript_Installation_and_Instructions_060425_v01.pdf)

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
