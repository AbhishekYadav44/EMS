# Employee Management System (EMS)

Employee Management System (EMS) is a full-stack web application designed to simplify employee management within an organization.

The application provides secure authentication and role-based access control, allowing administrators to manage employee records while employees can access and manage their own profile information.



## Live Application

https://ems-sooty-one.vercel.app/

## Github Repo : 
https://github.com/AbhishekYadav44/EMS.git


## Features


## Authentication & Authorization

- User registration and login
- JWT-based authentication
- Secure password encryption using bcrypt
- Protected routes
- Role-based access control for different users


## Admin Dashboard

Administrators have access to employee management features:

- View all employees
- View detailed employee information
- Add new employee records
- Update employee details
- Delete employee accounts
- Manage user roles


## Employee Dashboard

Employees can:

- Access their personal dashboard
- View profile information
- Update their profile details
- Manage their account information


## Application Workflow

1. Users register and log in to the application.
2. User authentication is verified using JWT.
3. Based on the assigned role, users are redirected to their respective dashboards.
4. Administrators can manage employee records and user roles.
5. Employees can view and update their personal information.


## Tech Stack


### Frontend

- Next.js
- React.js
- TypeScript
- Tailwind CSS
- Axios


### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

