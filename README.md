This is a QUOTE OF THE DAY WEBSITE. It fetches quotes from the api 'https://type.fit/api/quotes'. 
It has multiple functionalities.
It allows user to search any quote by author name.
User login / signup authentication and validation is provided. ZOD validation for user Signup.
Once the user is loggedin , it allows user to like a quote. Liked quote will be stored in database and it will be displayed in Liked page of that particular user.
It also provides 'TWEET' functionality to the user. User can tweet any quote directly in his twitter handle.
<br/>
To run this project, create database "quote_of_day" in mongodb/Atlas. Create collections "quotes" and "users". Change the URI in server/.env file with your URI. Once you are connected to Database, you can enjoy the quotes.
