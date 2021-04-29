# CapstoneProject
CIS4592 - Recon Game Suggestion Capstone Project

# To run the application
# 1) Github Directory Structure
  - Report
  - Manuals
  - Project Code
# 2) Installation (Prerequisites) 
  - NodeJS (v. 15.9)
  - Angular CLI (v. 11.2.9)
# 3) Running the application
  - Unzip the GitHub repository files onto your PC.
  - Navigate to each repository in your terminal (bash or command prompt) (you are going to need 2 terminals, one for recon client and one for the gateway).
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Services directory: <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1) CapstoneProject/api-gateway <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2) CapstoneProject/recon-client <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  - Change directory in each terminal to each directory listed above then type "npm install" to install the dependencies for the service
  - Type "npm start" to run each service.
  - Once each service is running open your web browser and navigate to https://localhost:4200 to visit our website!
  - Note: Before accessing the webpage in Chrome.. navigate to chrome://flags/ and ENABLE Allow invalid certificates for resources loaded from localhost.
    + This allows our self signed certificate to be validated by Chrome so HTTPS works. If this isnt done the website wont function as expected.
