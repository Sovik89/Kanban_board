# Simple Kanban Board

## Project Objective

* We have to create frontend only digital Kanban Board

## Tech Stack

* HTML5,CSS3,JavaScript

## Scope

* Frontend only

## Feature

### Must have
* Whole application : two section *toolbar section *main section

### UI components with : (HTML & CSS)

[*] Toolbar Section
    [ ] color picker
    [ ] create ticket button
    [ ] delete button

[*] Pop-up modal Section
    [ ] input
    [ ] color picker

[*] Ticket section
    [ ] header -> color ribbion
    [ ] id
    [ ] content
    [ ] lock button

### Functionality Component(Javascript)
[*] Ticket:
    [ ] create new Task
    [ ] Update a new Task
    [ ] Delete Task
    [ ] Filter on the basis of color
    [ ] Ticket creation
        [ ] type out the task
        [ ] select an intial color
        [ ] automatic id assignment to the ticket
        [ ] hide that popup
    [ ] Make our ticket survive reload and browser/tab closure--->Need to check

### Future scope (good to have Functionality)

[*] search of the task
[*] dividing the tasks into different section
[*] drag and drop
[*] start date and deadline
[*] delete button on a ticket
[*] we have write this in place holder. other wise as an app it should be known to user
[*] this modal should also disappear when th cursor is outside model is visible
[*] footer section for the copyright and author name

## UI Creation Steps

### Step 1: Create the navigation bar and the main section

[*] Navigation Section 

    [*]   First we go to the style section and make the presets ready. We make the margin and the padding to 0 px so we can utilise the whole page. This will be applied first in html,body

    [*]   The box-sizing property allows us to include the padding and border in an element's total width and height. We include it to all the components and sub-components in the project

    [*]   Defining the colors which we are going to use as standard red colors we are defining at root so we can use it with var() function.
    Courtesy:https://materialui.co/flatuicolors.

    [*] Nav bar or tool bar section is basically where the status selector section and add or delete button section is present.
        [ ] We use the colors as follows:
            [ ] Red - SLA breached(#E74C3C)
            [ ] Amber - In progress(#F1C40F)
            [ ] Green - Completed(#27AE60)
            [ ] Blue - Not started(#3498DB)

        
    [*] Now the add n delete button section is created: button for add and delete is taken from font awesome and the cdn for fontawesome is   added in the link tag of the header. Link: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css. 

[*] Main section:

    [*] This is a dynamic section where the tickets will be created as we use the add button and the design of this section will be in  flex-wrap:wrap; format which will assure the tickets will get added to the next row no place is left in a single row. Note we are trying at least one as a test.

    [*] Modal section(Pop up):
    This section will have the color selector and the TextArea where the Task will be written. The Id will be created automatically.The library for that is: https://cdn.jsdelivr.net/npm/short-unique-id@5.0.2/dist/short-unique-id.min.js.



### Step 2: Create the java script for functionality



[*] Declaration and Initialization: Selecting the components in the HTML page. we created const variables for all important components like navbar color selector,add/delete button.In main section we go for modal's textarea and the modal color selector.We keep the delete button as deactivated with a let variable(since there is scope of change later). We declare and instatiate a const color array and the random unique id const variable

[*] Modal creation:
    [*] Following are the options that needs to be taken care of for ticket creation:

    [*] Get Data from Our Modal 
    [*] click on plus  button -> popup should appear
    [*] default selected color should be red 
    [*] we have apply the option to choose color of our ticket
    [*] presses enter -> 
        [*] dialog box should disappear
        [*] get required data for ticket  
    * Modal : you need to set it to default -> before making it visible

    [*] Creating ticket
    [*]  Creating the UI
        [*] color strip
        [*] id
        [*] text
        [*] lock button

    [*] lock button : able to toggle it
        * locked -> non-editable
        * unlocked : editable

NOTE: The tickets' css will be created dynamically.

[*] Ticket Operations:
NOTE: The operations are based on the ticket div. Change color, Lock unlock button and the deletion of the tickets will be done if we click on the ticket div.

For changing color--> we nedd to oscillate amogst the four colors to move to any state at free will. This can be done only with the help of mod function. As for future scope we will not allow the to oscillate to other colors if green is reached

For deleting tickets--> we already have deleteTicket flag which by default false. We click on it we delete as much as ticket we want by clicking on it then if we again click on the delete button we we can stop deleting the tickets as the state of delete ticket is toggled back

[*]Filter by color:For filter by color we loop through all the colors in toolbox we remove the selectedcolor as we move by all the colors in colorModalArray. We then add the selected color in targetColorElem from event.target and add the selected to the targetColorElem. We select the currentColor as the ColorArray of the ith index(since color will remain constant). We send it to a helper function with currentColor where all the tickets in the  main container will be filtered according to the color selected by the currentColor parameter

[*] Remove filter by double click;> Straight forward concept if we double click on any of the selected status color in the toolbox the fliters will be looped through all the colors in toolbox we remove the selectedcolor as we move by all the colors in colorModalArray. in the selectAll() function we remove the filters by cTicket.style.display = "block"; as we move through the array.
















 




