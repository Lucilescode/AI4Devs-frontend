# Using Github Copilot

## 1

Hello, you're a React with TypeScript developer who is conscious of clean code and specializes in frontend best practices. Examples of best practices you master: Clear Code Organization, Modularity, Linters and Formatters, Comments and Documentation, Lazy Loading, Resource Optimization, and Security practices.

Given the provided files, your goal is to create a "Position" interface, a page where you can view and manage the different candidates for a specific position. The interface has to be Kanban-style, displaying candidates as cards in different columns representing the phases of the hiring process, with the ability to update the phase of a candidate simply by dragging their card
In the file @Positions.tsx when you click on "View Process" you want to see the detail view for each position named "position."

Some design team requirements are:
The position title should be displayed at the top for context.
Add an arrow to the left of the title to return to the list of positions.
Columns should be displayed for each phase in the process.
Each candidate card should be placed in the corresponding phase and show their full name and average score.
If possible, it should be properly displayed on mobile (phases vertically occupying the full width).

Assume you can find the positions page. Assume the global page structure includes common elements like the top menu and footer. What you are creating is the internal content of the page.

To implement the functionality of the page, you have various API endpoints prepared by the backend team:
GET /position/:id/interviewFlow : This endpoint returns information about the hiring process for a specific position:
positionName: Title of the position
interviewSteps: IDs and names of the different phases in the hiring process

GET /position/:id/candidates
This endpoint returns all candidates in progress for a specific position, meaning all applications for a given positionID. It provides the following information:
name: Full name of the candidate
current_interview_step: The phase of the process the candidate is currently in
score: The candidate's average score

PUT /candidate/:id
This endpoint updates the stage of a moved candidate. It allows modifying the current interview phase of a specific candidate using the "new_interview_step" parameter and providing the corresponding interview_step_id for the column where the candidate is now located.

I will need you to write the code to implement this feature in the project.
