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
  const topicDateInput = document.getElementById("topic-date");
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]; 
  // Set the value of the input field to today's date
  topicDateInput.value = today;

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

 // Display agenda items for selected user
// Display agenda items for selected user
function showAgenda() {
  const userSelect = document.getElementById("user-select");
  const agendaDiv = document.getElementById("agenda");

  const userId = userSelect.value;
  let agendaItems = getData(userId);

  // If no agenda items found, set agendaItems to an empty array
  if (!agendaItems) {
    agendaItems = [];
  }

  // Get current date to compare against revision dates
  const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  
  // Filter agenda items to only show future revisions
  const futureAgendaItems = agendaItems.filter(item => {
    const revisions = item.revisions || {};
    // Compare revision dates with current date to filter out past items
    return (
      (revisions.oneWeek && revisions.oneWeek >= currentDate) ||
      (revisions.oneMonth && revisions.oneMonth >= currentDate) ||
      (revisions.threeMonths && revisions.threeMonths >= currentDate) ||
      (revisions.sixMonths && revisions.sixMonths >= currentDate) ||
      (revisions.oneYear && revisions.oneYear >= currentDate)
    );
  });

  // Display agenda or show a message if no future agenda items exist
  agendaDiv.innerHTML = futureAgendaItems.length > 0
    ? `<h3>User ${userId}'s Upcoming Agenda:</h3>
       <ul>
         ${futureAgendaItems.map(item => {
           const revisions = item.revisions || {};
           return `<li>
                    <Strong>${item.topic} - ${item.date}</strong> <br><br>

                     Upcoming Revisions: <br><br>
                     <strong>1 Week:</strong>  ${item.topic} ${revisions.oneWeek || "N/A"} <br>
                     <strong>1 Month:</strong> ${item.topic} ${revisions.oneMonth || "N/A"} <br>
                     <strong>3 Month:</strong> ${item.topic} ${revisions.threeMonths || "N/A"} <br>
                     <strong>6 Month:</strong> ${item.topic} ${revisions.sixMonths || "N/A"} <br>
                     <strong>1 Year:</strong>  ${item.topic} ${revisions.oneYear || "N/A"}
                   </li>`;
         }).join('')}
       </ul>`
    : "<p>No upcoming agenda items for this user</p>";
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