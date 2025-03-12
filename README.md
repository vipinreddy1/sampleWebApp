Project Setup:
  Clone the repository: git clone [<repository-url>](https://github.com/vipinreddy1/sampleWebApp)
Install dependencies:
  For backend: cd backend && npm install
  For frontend: cd frontend && npm install
Set up the database (if applicable):
  the database used is sqllite, I have already created the database but in case there is need to seed the data again, just navigate to localhost:10000/createdata.
  The data is stored in a file called sampledata.db, if there is any issue one can delete the data in this and seed the data again.
  
Run the application:
For backend:
  1.cd backend
  2. node index.js
For frontend: 
1.cd frontend 
2.npm start
Access the application at http://localhost:3000, backend api can be accessed at localhost:10000.
Authentication Details:
username - mike
password - longpassword

Features:
I have implemented authentication and search functionality for products. There is also a login page which will send the JWT to the user.
Without the JWT it should redirect to the login page after throwing an alert.
Passwords are stored in plaintext in the DB, this is an insecure practice but for the sake of simplicity I have not hashed the passwords.
APIs: 
/products : has authentication and search functionalities
/login: user can login with the above authentication details to access the other parts of the website
/products:id gets just one product with id, which is the unique key in this case



