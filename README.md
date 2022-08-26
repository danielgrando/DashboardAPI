# DashboardAPI

> Status: Developing... ⚠️

## A simple API to simplify the search for data on all IFPR. Like campus, courses and students.

+ The file updated to import is here https://dados.gov.br/dataset/alunos-ifpr

### Some routes below


+ **POST** -> (/v1) -> Send file with csv format and multipartformdata configuration, file = aluno-matriculas-e-cursos.csv
+ **GET** -> (/v1) -> To Get All counts about resources (campus, courses and students)

+ **GET** -> (/v1/campus/courses) -> To Get how many courses is present in all campus

## How to run the application:

1) npm install
2) npm run dev
