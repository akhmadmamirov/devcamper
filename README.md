# DevCamper Backend API

![DevCamper Logo](https://link-to-your-logo-image.png)

This repository contains the backend API for the DevCamper project. The frontend/UI is currently under development. You can preview the HTML/CSS template at [https://devcamper-wsur.onrender.com/](https://devcamper-wsur.onrender.com/) to get an idea of the expected functionality.

## Overview

This backend API fulfills the following requirements:

### Bootcamps

- List all bootcamps stored in the database.
- Implement pagination for bootcamp listing.
- Select specific fields in the results.
- Apply limits to the number of returned results.
- Allow filtering by various fields.
- Enable bootcamp searches based on radius from a zipcode.
- Utilize a geocoder to obtain precise location and coordinates from an address.
- Retrieve details of a single bootcamp.
- Create new bootcamps.
  - Authentication required.
  - Limited to users with "publisher" or "admin" roles.
  - Publishers can create one bootcamp; admins can create multiple.
  - Validate fields using Mongoose.
  - Upload bootcamp photos (owner only).
  - Photos are stored locally.

### Update and Delete Bootcamps

- Update bootcamp details (owner only).
- Delete bootcamps (owner only).

### Calculations

- Calculate average cost of bootcamp courses.
- Calculate average rating from bootcamp reviews.

### Courses

- List courses for a bootcamp.
- List all courses with pagination and filtering.
- Get details of a single course.
- Create new courses.
  - Authentication required.
  - Limited to users with "publisher" or "admin" roles.
  - Only bootcamp owners or admins can create courses for a bootcamp.
  - Publishers can create multiple courses.
- Update course details (owner only).
- Delete courses (owner only).

### Reviews

- List reviews for a bootcamp.
- List all reviews with pagination and filtering.
- Get details of a single review.
- Create new reviews.
  - Authentication required.
  - Limited to users with "user" or "admin" roles (no publishers).
- Update reviews (owner only).
- Delete reviews (owner only).

### Users & Authentication

- Implement JWT/cookie-based authentication.
  - JWT and cookies expire in 30 days.
- Register as "user" or "publisher."
- Receive token and cookie upon registration.
- Hash user passwords securely.
- Login with email and password.
- Compare hashed passwords during login.
- Get a token and cookie upon successful login.
- Logout and clear the token cookie.
- Retrieve details of the logged-in user.
- Reset passwords via email with a hashed token (expires in 10 minutes).
- Update user info (authenticated user only).
- Separate route to update passwords.
- Admin-only CRUD operations on users.

### Security & Documentation

- Create documentation using Postman.
- Generate HTML files from Postman using docgen.
- HTML files serve as the API's root ("/") route.

## Getting Started

1. Clone this repository.
2. Install dependencies.
3. Set up environment variables.
4. Run the application.

For detailed instructions and usage examples, consult the documentation provided in the HTML files.

---

Explore the capabilities of the DevCamper Backend API and contribute to its development. If you have questions or suggestions, please reach out.

**Note:** The frontend/UI is not included in this repository and is under development.
