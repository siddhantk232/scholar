# Scholar

- document along
- swagger in the end

## Entities

- Users (Admin | Teachers | Students)
- Class

## Tables

- users
- class
- scores

- students can have many classes (n:m)
- a class can have only one teacher (1:1) (a teacher can have multiple TAs but that's out of scope for now)
- a student can have many scores but a score belongs to one student (1:n)
- teachers should be able to add students to a class and create new classes but that's out of scope
- student can have many score, a score belongs to one user (1:n)
- class can have many score, a score belongs to one class (1:n)

- admin only manages (can't be in class, can't be a student, can only create and manage teachers/students/classes)

## Features

- Admin: As an admin, a user can

  - Manage Classes - Create, Update, Delete Classes
  - Manage Teachers
    - Add a Teacher’s Account
    - Map Teacher to existing Class
    - Get list of teachers

  - Manage Student
    - Add Student
    - Map Student to existing class
    - Get List of Students

  - Teacher: As a teacher, a user can
    - Get list of the students (sorted on name)
    - Create Score Card for a student. A score card will have these feilds
      - Subject Name
      - Date of Exam
      - Date of Score Card (Default to today)
      - Score (out of 100)

- Comments
  Get student ranking based on the % of all the subjects. Let’s say, Student A has
  multiple subjects - English, Maths, Science and each of the score is, 70, 40, 65
  respectively, the total sum of the score for the student is 70+40+65 = 175/300,
  hence the student scored 58%. Now there is another student Student B which
  has two subjects - English, Social Science and has scored 60 and 80
  respectively, which gives a total % of 70% (60+80 = 140/200 for two subjects).
  Hence in the ranking sheet, the Student B comes above Student A.

- Students: View their own score card for all the subjects.

## Routes

-   [x] POST     /auth/login
-   [x] POST     /auth/signup

-   POST     /admin/teacher
-   GET      /admin/teacher
-   GET      /admin/teacher/:id
-   DELETE   /admin/teacher/:id

-   POST     /admin/class
-   GET      /admin/class
-   GET      /admin/class/:id

  `genral structure of routes /role/actionFor/actionId/actionTo/actionToId`

-   POST   /admin/teacher/:teacherId/class/:classId
-   POST   /admin/student/:studentId/class/:classId

-   POST   /teacher/student/:studentId/class/:classId

-   GET    /student/score
-   GET    /student/score/:classId

## Todo

- [x] setup licence
- [x] setup readme

- [x] setup tsc
- [x] setup prettier

- [x] setup express server
- [x] setup routes v1

- [x] setup data layer using prisma
- [x] setup docker postgres
- [x] database models
- [x] document README

- [x] auth
- change auth so that only admin can create new users (TEACHERs/STUDENTs/ADMINs)

- [ ] start working on components and features




