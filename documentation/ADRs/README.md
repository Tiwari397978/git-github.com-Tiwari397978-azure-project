# Design Model and Layout ADR  

## CONTEXT:  
Good development practices requires Separation of Concerns (SoCs) to enable the development of robust code  

## PROBLEM:  
Source code can become unreadable, long and difficult to edit - making testing and maintenance difficult  

## SOLUTION: 
### The Front End Utilizes a Model-View-ViewModel View (M-V-VM) architecture pattern
- Model abstracts html methods for API calls
- View-Model utilises model methods to dynamically update views i.e. html pages  
- View refers to the html pages served to the app user

### The Back End Utilizes a Layered Architecture
- Repositories abstracts SQL server database access commands
- Services utilises repositories to create fetch relevant information 
- Routes utilises services to fetch information required by API calls for client 


# Code Review Guide ADR

## CONTEXT: 
###  Quality Assurance when integrating features  

## PROBLEM:  
### Writing Code that is:  
  - Safe from bugs  
  - Easy to understand  
  - Ready for change  

## SOLUTION:  
- Adhere to Coding Style Standards  
- Use of camel casing for variables  
- Adhere to the DRY Principle  
- Check for comments  
- Check Unit and Integration Tests  
- Adhere to the failure fast principle  
  - Static checking fails faster than dynamic checking  
  - Dynamic checking fails faster than producing a wrong answer that   may corrupt subsequent computations  
- Avoid Magic Numbers  
- One purpose for each variable  
- Use good names  
- Use Exceptions rather than return codes  
- Use whitespace for readability  

# Development Practice ADR  

## CONTEXT:  
### Developing an app via Agile methodology (CID).  

## PROBLEM:  
### Cannot have monolithic classes or untested code  

## SOLUTION:  
### Test Driven Development  
- Enables agile quality assurance  
- Requires small slices  
- Minimises need for refactoring (code smells)  

# Javascript Coding Style ADR  

## CONTEXT:  
### Javascript has different formatting styles  

## PROBLEM:  
### One formatting style needs to be chosen to maintain consistency.   

## SOLUTION:  
### Standard JS formatting style chosen  
- Required by course  
- Linter easily setup  
- Team members familiar with it  

# Login/Registration Page ADR

## CONTEXT: 
A user needs to either login or register an account when accessing the app  

## PROBLEM: 
Two related functions are intertwined (logging in and registering)

## SOLUTION:  
### Combine the Login and Registration Page  
- User can login using their username and password  
- User can also register using new details with the input fields dynamically generated  

# Project Library \& Tool Requirements ADR  

## CONTEXT:  
Developing A Web App for ELEN4010  

## PROBLEM:  
Several tools and libraries are needed to develop a web app.  

## SOLUTION:  
### Use specified tools and libraries (as per brief)  
- JavaScript \& Node.js for web development  
- [Travis-CI](https://www.travis-ci.com/) as a CI/CD tool  
- [Express](https://expressjs.com/) Framework with CSS [bootstrap](https://getbootstrap.com/)  
- [Socket.io](https://socket.io/) for websocket message implementation  
- [Azure](https://azure.microsoft.com/en-us/services/app-service/web/) web server deployment  
- [MSSQL](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) Database  
- [Jest](https://jestjs.io/) testing framework  
- [Coveralls](https://coveralls.io/) for code coverage and testing history  

# User Story Map Creation, Access \& Editing  

## CONTEXT:  
Agile development involved creating a user story map in order to analyse user needs and develope around them  

## PROBLEM: 
Need a means to create user story map that is easily accessibly by all users, is easily editable and enables the functionality required  

## SOLUTION: 
Using the Miro platform to generate and keep track of user story maps  

# Web Access Requires Login ADR  

## CONTEXT: 
Accessing webpages on the hiking app  

## PROBLEM: 
Accessing the features of the hiking web app requires the user to have an account and for the app to know the user's account details  

## SOLUTION: 
Require the user to be logged in order to access the webpage  

# SQL Server Group Membership Tracking ADR  

## CONTEXT: 
The Hiking web app requires a means to store and retrieve information - an SQL Server database is used to satisfy this requirement.

## PROBLEM: 
Tracking the membERship of groups in the app is difficult to in an SQL database structure as the number of members in a group is not fixed.

## SOLUTION: 
Implementing a [many-to-many](https://support.airtable.com/hc/en-us/articles/218734758-Airtable-s-guide-to-many-to-many-relationships#manytomany) relationship enables the tracking of group members through the use of a "junction table" (example below)  

<img src="https://support.airtable.com/hc/en-us/article_attachments/206766528/Screen_Shot_2016-04-26_at_3.03.32_PM.png"
     alt="Markdown Monster icon"
     style="float: left; margin-right: 10px;" />
Airtable. (2021). many to many relationship. Retrieved from https://support.airtable.com/hc/en-us/article_attachments/206766528/Screen_Shot_2016-04-26_at_3.03.32_PM.png
