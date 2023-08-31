Welcome to the DevCamper Backend API repository. This API serves as the backend for the DevCamper project. Please note that the frontend/UI is still under development. You can refer to the HTML/CSS template available at https://devcamper-wsur.onrender.com/ for an idea of the intended functionality.

Project Overview
The DevCamper Backend API has been designed and developed to meet the following requirements:

Bootcamps
List all bootcamps stored in the database.
Enable pagination for the bootcamp list.
Select specific fields in the result for efficient querying.
Set limits on the number of results returned.
Implement filtering based on various fields.
Perform bootcamp searches by radius from a specific zipcode.
Utilize a geocoder to obtain precise location and coordinates from a single address field.
Retrieve details of a single bootcamp.
Create new bootcamps.
Access restricted to authenticated users.
Limited to users with the "publisher" or "admin" role.
Publishers can create only one bootcamp, while admins can create multiple.
Validate fields using Mongoose.
Enable photo upload for bootcamps.
Restricted to bootcamp owners.
Photos are stored in the local filesystem.
Update and Delete Bootcamps
Update bootcamp details.
Access restricted to owners.
Validate update information.
Delete bootcamps.
Access restricted to owners.
Calculations
Calculate the average cost of courses within a bootcamp.
Compute the average rating from reviews for a bootcamp.
Courses
List all courses for a specific bootcamp.
List all courses across bootcamps.
Pagination and filtering options available.
Retrieve details of a single course.
Create new courses.
Access restricted to authenticated users.
Limited to users with the "publisher" or "admin" role.
Only bootcamp owners and admins can create courses for a bootcamp.
Publishers can create multiple courses.
Update course information.
Access restricted to course owners.
Delete courses.
Access restricted to course owners.
Reviews
List all reviews for a particular bootcamp.
List all reviews across bootcamps.
Pagination and filtering options available.
Retrieve details of a single review.
Create new reviews.
Access restricted to authenticated users.
Limited to users with the "user" or "admin" role (no publishers).
Update reviews.
Access restricted to review owners.
Delete reviews.
Access restricted to review owners.
Users & Authentication
Implement user authentication using JWT and cookies.
JWT and cookies expire in 30 days.
Allow user registration as "user" or "publisher."
Upon registration, a token will be sent along with a cookie (token = xxx).
User passwords are securely hashed.
Enable user login using email and password.
Compare plain text passwords with stored hashed passwords.
Provide a token and cookie upon successful login (token = xxx).
Support user logout by sending a cookie to set token = none.
Retrieve information about the currently logged-in user via token.
Implement password reset functionality.
Users can request a password reset.
A hashed token will be sent to the user's registered email address.
The token will expire after 10 minutes.
Users can use a put request to the provided URL to reset their password.
Allow authenticated users to update their information.
Provide a separate route for updating passwords.
User CRUD operations are restricted to administrators.
Security
Documentation is created using Postman.
HTML files generated from Postman using docgen.
HTML documentation files are available at the root ("/") route of the API.
Getting Started
Clone this repository.
Install the required dependencies.
Set up your environment variables.
Run the application.
For detailed setup instructions and usage examples, please refer to the documentation provided in the HTML files.

Feel free to explore the capabilities of the DevCamper Backend API and contribute to its development. If you have any questions or suggestions, please don't hesitate to reach out.

Thank you for being a part of this project!
