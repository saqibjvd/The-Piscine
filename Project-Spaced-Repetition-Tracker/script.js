// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, addData, clearData } from "./storage.js";

window.onload = function () {
  const userSelect = document.getElementById("user-select")
  const agendaDiv = document.getElementById("agenda");
  const topicForm = document.getElementById("topic-form");
  const clearBtn = document.getElementById("clear-btn");

  const users = getUserIds();
  
  users.forEach(userId => {
   const option = document.createElement("option");
   option.value = userId;
   option.textContent = `user ${userId}`
  userSelect.append(option)
  });
};

// creating revision date 1 week => 1 year
function getRevisionDates(startDate) {
  const start = new Date(startDate);

  // Calculate different revision intervals
  const oneWeek = new Date(start);
  oneWeek.setDate(start.getDate() + 7); // 1 week later

  const oneMonth = new Date(start);
  oneMonth.setMonth(start.getMonth() + 1); // 1 month later

  const threeMonths = new Date(start);
  threeMonths.setMonth(start.getMonth() + 3); // 3 months later

  const sixMonths = new Date(start);
  sixMonths.setMonth(start.getMonth() + 6); // 6 months later

  const oneYear = new Date(start);
  oneYear.setFullYear(start.getFullYear() + 1); // 1 year later

  // Return all revision dates
  return {
    oneWeek: oneWeek.toISOString().split('T')[0], // Format date as YYYY-MM-DD
    oneMonth: oneMonth.toISOString().split('T')[0],
    threeMonths: threeMonths.toISOString().split('T')[0],
    sixMonths: sixMonths.toISOString().split('T')[0],
    oneYear: oneYear.toISOString().split('T')[0],
  };
}


 // Display agenda items for selected user

 function showAgenda() {
  const userSelect = document.getElementById("user-select");
  const agendaDiv = document.getElementById("agenda");

  const userId = userSelect.value;
  const agendaItems = getData(userId);

  agendaDiv.innerHTML = agendaItems && agendaItems.length > 0
    ? `<h3>User ${userId}'s Agenda:</h3>
       <ul>
         ${agendaItems.map(item => {
           // Ensure revisions exist, even if it wasn't correctly added in the first place
           const revisions = item.revisions || {};
           return `<li>
                     ${item.topic} - ${item.date} <br>
                     <strong>Revisions:</strong> <br>
                     1 Week: ${revisions.oneWeek || "N/A"} <br>
                     1 Month: ${revisions.oneMonth || "N/A"} <br>
                     3 Months: ${revisions.threeMonths || "N/A"} <br>
                     6 Months: ${revisions.sixMonths || "N/A"} <br>
                     1 Year: ${revisions.oneYear || "N/A"}
                   </li>`;
         }).join('')}
       </ul>`
    : "<p>No agenda items found for this user</p>";
}

// Initial agenda display
showAgenda();

const userSelect = document.getElementById("user-select");
const topicForm = document.getElementById("topic-form");
const clearBtn = document.getElementById("clear-btn");

// Event listeners
userSelect.addEventListener('change', showAgenda);

topicForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const topicName = document.getElementById("topic-name").value;
  const startDate = document.getElementById("topic-date").value;

  const revisionDates = getRevisionDates(startDate);

  const newTopic = {
      topic:topicName,
      date: startDate,
      revisions: revisionDates 
  };
  addData(userSelect.value, [newTopic]);
  showAgenda();
  this.reset();
});


clearBtn.addEventListener('click', function() {
  if(confirm("Are you sure you want to clear all data for this user?")) {
      clearData(userSelect.value);
      showAgenda();
  }
});











// getUserIds() .. saqib done
//when called, returns an array of strings, each of which is a user id

// getData(userId) .. donara
//when called with a user id string as an argument, returns an array of objects, 
//each of which represents an agenda item for the user

// addData(userId, data) ...saqib
//when called with a user id string and an array of objects as arguments, 
//it will append the agenda items data to the user’s stored agenda. 
//Each of the objects should contain information about the agenda item, 
//such as the date and topic that should be revised on that date. The function does not return anything

//clearData(userId)... donara
// when called with a user id string as an argument, 
//it will clear any stored data associated with the user id. 
//This is provided to help with development, and is not required in the final code
