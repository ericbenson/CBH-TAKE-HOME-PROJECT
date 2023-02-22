# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket #1: Create a new FacilityAgentID database table 

    Acceptance criteria: A new DB table has been created with the following schema: 
    ```
        {
        _id: unique identifier,
            facility_id: ref to facility _id,
            agent_id: ref to agent _id,
            custom_id: custom Id facility prefers to use for agent 
        }
    ```
    Time/Effort estimates: 
        This ticket should not take a single developer more than 1 hour.  Care must be taken when adding new tables to the production DB. 

    Implementation details: 
        Create the table in the DB. Add the schema to the appropriate areas that reference the database table (ORM) 
        

Ticket #2: Provide CRUD api routes for the new FacilityAgentID database table
    Acceptance criteria: 
        Create, Read, Update, and Delete API routes exist for the new FacilityAgentID table with following signatures 
        createFacilityAgentID(facility_id, agent_id, custom_id) => returns 201, 400
        readFacilityAgentID(facility_id, agent_id) => returns 200 with the custom_id, 400, 404
        updateFacilityAgentID(facility_id, agent_id, custom_id) => returns 200, 400, 404
        deleteFacilityAgentId(facility_id, agent_id) => returns 200, 400, 404
        if request is unsuccessful, respond with proper error status code. 

    Time/Effort estimates: 
        Creating these routes should not take single developer over a day. Routes for CRUD operations on other tables should exist that can be used as reference. 

    Implementation details: 
        The new API routes for FacilityAgentID should be in the same format as the existing CRUD api routes for other database tables. 
        Update the API server with these new routes. The new routes must be exposed in the API server. Each route will have the logic to 
        perform the corresponding actions on the newly created FacilityAgentID database table (read calls will need to read the DB table, etc.). Status codes for success are outlined in the ACs. Status codes should correspond to the type of error that was encountered.  


Ticket #3: Update the Facilities admin portal with custom Agent ID capabilities
    Acceptance criteria: 
        As a Facility Admin, I want the ability to add/update/remove custom agent IDs in real-time for the people at my facility.   
    Time/Effort estimates: 
        Creating the client-facing interfaces should not take a single developer over a day if approved designs already exist. 
    Implementation details: 
        Update the existing admin interface to include an area where custom agent IDs can be added/updated/removed. If approved design already exists, implement as designed unless you find the design does not match the use case or you think it can be improved. In these cases, get in contact with the designer to discuss your thoughts. One possible implementation could be a page on the admin portal that resembles a spreadsheet with a column with the existing Agent ID, and another column with the custom agent ID if it exists. The spreadsheet gives the admin the capability to add/update/delete the custom agent ID by interacting with the appropriate buttons on the page. The page will listen for user input and call the appropriate CRUD route on user submit. After successful submit, the page will update with the latest information.  


Ticket #4: Add a step to the generateReport process which replaces the Agent _id with the agent's custom_id for that facility
    Acceptance criteria: 
        When the generateReport function is run, it is populated with the custom Agent ID if it exists. Otherwise it is populated with the existing Agent ID
    Time/Effort estimates:
        This should not take a single developer more than half a day.  
    Implementation details: 
        Currently when the generateReport function is run, the facilityId is known (because it is used to run the getShiftsByFacility function) and the agentId is known (because it is currently populated in the report). Before generating the report in PDF form, the shift data that is used to populate the report needs to be updated with the facility agent id. This can be done by performing a query on the FacilityAgentID database table using both the facilityId and agentId as keys for the query. If a match is found, update the agent ID on the shift to the custom agent ID found from the query. If nothing is found, keep the existing agent ID. 
