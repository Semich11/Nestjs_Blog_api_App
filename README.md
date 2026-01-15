# 📝 NestJS Blog API (PostgreSQL + TypeORM)

A RESTful Blog API built with **NestJS**, **PostgreSQL**, and **TypeORM**.  
This project provides backend functionality for a blogging platform, including authentication, blog posts, and comments, following clean architecture and best practices.



## 🚀 Features

- User authentication & authorization (JWT)
- Create, read, update, and delete blog posts
- Comment system
- Protected routes using Guards
- Data validation using DTOs
- PostgreSQL database with TypeORM
- Pagination and filtering
- Modular and scalable architecture
- Swagger API documentation



## 🛠️ Tech Stack

- **NestJS**
- **TypeScript**
- **PostgreSQL**
- **TypeORM**
- **JWT (Passport.js)**
- **Class-validator & class-transformer**
- **Swagger**


## 📂 Project Structure

src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   └── guards/
├── users/
│   ├── user.entity.ts
│   ├── users.controller.ts
│   └── users.service.ts
├── posts/
│   ├── post.entity.ts
│   ├── posts.controller.ts
│   └── posts.service.ts
├── comments/
│   ├── comment.entity.ts
│   ├── comments.controller.ts
│   └── comments.service.ts
├── common/
│   ├── decorators/
│   ├── filters/
│   └── interceptors/
├── app.module.ts
└── main.ts
