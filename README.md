# ReactJS
Set up your user and identity pools

Go to the AWS Console and create a user pool and a federated identity pool. The user pool needs an associated app which must NOT have a secret. First build the library, and then the examples, then change into the htdocs directory and run the webserver:
Running the app

npm install npm start
Create a test user

    Go to your user pool and go to "Users and groups"
    Click "create user"
    Complete the form:

    Enter a username
    Enter a password that conforms to the rules of the user pool
    Uncheck 'Mark phone number as verified?'
    Uncheck 'Mark email as verified?'
    Enter a valid email address
    Click 'Create User'

First time login

    Go to your deployed example application webserver
    You should see the login form
    Enter the username and password created above
    You should be asked for a new password, since this is your first login
    Enter a new password. It must conform to the rules of the user pool.
    You should then be taken to a verification code entry screen. check your email and enter the code.
    You should now see the logged in screen, showing your attributes and giving you some options.

Note that during this flow quitting and reloading the browser, then navigating back to this page, will result in you returning to the correct step.
Logout and Login

    Click 'log out'
    You should see the login form
    Login again using your username and the new password you chose above.
    You should be taken to the logged in screen

Password changing

    Click 'Change password'
    Enter your existing password and a new password
    Click set new password
    you should see a message saying your password has been changed
    Click 'Home'

Change email address

    Click 'Change email address'
    You should see a form with your existing email address
    Enter a new valid email address
    You should be asked for a verification code. Check your email for the code.
    Enter the code.
    You will be taken to the logged in screen.

Note that you can also reload the page after step 4, or close your browser, and you will be required to enter the verification code.
Password recovery

    Log out
    Click 'Password Reset'
    Enter your username
    Click 'send verification code'
    It should say 'verification code sent'
    Check your email and get the code
    enter the code and your new password
    Click 'set new password'
    It should say 'Password reset'
    Click 'Home'
    Log in with your new password
    
npm install
    
npm install rc-calendar
npm install --save moment react-moment
npm install --save prop-types
npm install --save moment-timezone
npm install -g npm-install-peers
sudo npm install react-router-dom

npm start
sudo npm run build
