## Personal notes
- took the liberty to change from class components to hooks, for me personally is easier to develop using hooks because 
in the last year and a half I've been using only these
- changed the state management tool to Redux Toolkit (https://redux-toolkit.js.org/)
- because I've used slices and moved all data management into redux I didn't see any reason
to keep the containers
- I am not sure I got the task with the chart right(comments in features) 
 
## Features
- to be able to subscribe to messages the user needs to be logged in (have a token)
- if there is no host in connection details the default "http://localhost:3030" is used
- once the user adds a sql query and press subscribe we create a websocket connection
and get the data from the server
- the websocket automatically disconnects when 1000 messages are received
- every time the user clicks subscribe button the websocket opens and gets the new data
- display list with data populated from the server
- added full text search on UI by every property the server message has in the value property
- user is able to clear messages by clicking the "Clear Messages" button
- user can choose xAxis and yAxis properties to be displayed in the chart

## Tests
- added some minimal tests for components
- added some minimal tests for redux