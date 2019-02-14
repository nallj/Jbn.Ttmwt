# Jbn.Ttmwt

### Requirements
* Node.js + npm
* MS SQL Server
* Visual Studio

### Installation

1) Upzip contents.
2) Install database via the publish script within the **Jbn.Ttmwt.Db** directory.  This will create a database known as *Ttmwt*.
    * ASSUMPTION: The target host has a MS SQL instance known as "XYZ".  This may be changed within the publish script.
    * Optional: Add some initial device records by running the AddInitialDevices.sql script within the **Jbn.Ttmwt.Db/Scripts** directory.
3) Run the command `npm install` within the **Jbn.Ttmwt.App** directory.  Conversely, you may open the **packages.json** file within Visual Studio and save the file with no changes; this should trigger the instance of npm internal to Visual Studio to install. 

### How To Use
1) Within Visual Studio, build and run the **Jbn.Ttmwt.WebServices** project to start the back-end.
    * ASSUMPTION: The target host has a MS SQL instance known as "XYZ".  This may be changed within the **appsettings.Development.json** file.
2) Run the command `npm start` within the **Jbn.Ttmwt.App** directory.  Conversely, if you have the "NPM Task Runner" extension within Visual Studio you may use that in tandem with the "start" command.  A web browser should open to the application.
