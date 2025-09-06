WhatsApp Web Clone (Chat App) :-
A simple WhatsApp-style web application built with Node.js, Express, MongoDB, and Bootstrap.
Users can create, edit, and delete chat messages in a UI inspired by WhatsApp Web.

----------


Features :
1. Create new chat messages (New Chat button).
2. Edit existing messages (Edit button).
3. Delete messages (Delete button).
4. Display sender, receiver, message, time, and date.
5. Bootstrap styling for a clean and responsive UI.


---------


Screenshot :  
<img width="1366" height="768" alt="Screenshot (58)" src="https://github.com/user-attachments/assets/c7f818a0-75d5-4682-ae60-c852678545eb" />

-------

Tech Stack :
1. Frontend: HTML, CSS, JavaScript, Bootstrap
2. Backend: Node.js + Express
3. Database: MongoDB with Mongoose
4. Views: EJS (or whichever template engine you used)

----------

Project Structure :  
Whatsapp/
-│── models/            # Database models (e.g., Chat schema for MongoDB)
-│── public/            # Static files (CSS, JS, images, Bootstrap assets)
-│── views/             # Templates (EJS/Pug/Handlebars for rendering UI)
-│── index.js           # Main server file (Express app entry point)
-│── init.js            # Database connection / initialization file
-└── README.md          # Project documentation

------------

Installation & Setup 
- Clone the repository :-    
git clone https://github.com/sanket-ghayal/whatsapp-web-app.git
-cd whatsapp-web-app


------------


Install dependencies:
-npm install

Dependencies Used :-   
-express
-mongoose
-ejs
-method-override
-dotenv


-------------

MongoDB connection is already configured inside init.js. 
Update the connection string there if needed.

-------------

Start the server :-  
npm start

---------------

Open in browser:-   
http://localhost:8080/chats


---------------
