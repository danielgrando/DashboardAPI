# DashboardAPI

> Status: Developing... ⚠️

## A simple API to simplify the search for data on all IFPR. Like campus, courses and students.

+ The file updated to import is here https://dados.gov.br/dataset/alunos-ifpr

### Some routes below


+ **POST** -> (/v1) -> Send file with csv format and multipartformdata configuration, file = aluno-matriculas-e-cursos.csv
+ **GET** -> (/v1) -> To get All counts about resources (campus, courses and students)
+ **GET** -> (/v1/campus/courses) -> To get how many courses is present in all campus
+ **GET** -> (/v1/courses/students) -> To get how many students is present in all courses
+ **GET** -> (/v1/students/date?start=X&end=Y) -> To get how many students by date start and expected end of course
+ **GET** -> (/v1/students/status?status=X) -> To get how many students by status of matriculation

## How to run the application:

1) npm install
2) create file .env
3) configure your database variables in .env
4) npm run dev
