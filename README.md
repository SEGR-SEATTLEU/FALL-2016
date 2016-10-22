# FALL-2016

For this version of the project, you can do this:

- Install MySQL
- Open and run SQL scripts in your local instance
  - init
  - create
  - insert
  - routines

- Also create user 'expressuser' with full permissions on your 'wta' database and give them the password 'pa55w0rD' or a different password but then edit the connection information in expressapp/routes/index.js file
- Open a terminal / command prompt  
- Change to expressapp directory
- Run ```npm install```
- Run ```DEBUG=myapp:* npm start``` (Mac) or ```set DEBUG=myapp:* & npm start``` (Windows)
- Visit http://localhost:3000/available?pickupdate=2016-11-08&returndate=2016-11-13
- You should see a table of the available items

Kellie - Test to see if I can update repo (Will remove)