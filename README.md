# DashboardAPI

> Status: Developing... ⚠️

## A simple API to simplify the search for data on all IFPR. Like campus, courses and students.

+ The file updated to import is here https://dados.gov.br/dataset/alunos-ifpr
+ The application is hosted at: https://ifprdashboard.herokuapp.com/
+ **Data is treated to be saved from 2021 onwards because the HEROKU hosting plan free and is the maximum lines supported.**

### Some routes below


+ **POST** -> (/v1) -> Send file with csv format and multipartformdata configuration, file = aluno-matriculas-e-cursos.csv
+ **GET** -> (/v1) -> To get All counts about resources (campus, courses and students)
+ **GET** -> (/v1/campus/courses) -> To get how many courses is present in all campus
+ **GET** -> (/v1/courses/students) -> To get how many students is present in all courses
+ **GET** -> (/v1/courses/modality) -> To get how many courses there are in the face-to-face and EAD model, and which one is present in each.
+ **GET** -> (/v1/students/date?start=X&end=Y) -> To get how many students by date start and expected end of course
+ **GET** -> (/v1/students/status) -> To get how many students by status of matriculation
+ **GET** -> (/v1/students/campus) -> To get how many students by campus


## How to run the application:

1) npm install
2) create file .env
3) configure your database variables in .env
4) npm run dev
