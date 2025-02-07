// // script test.js

// import { getRevisionDates, showAgenda } from './script';


// import { getData } from './storage.js';

// // Mock the getData function from the storage module
// jest.mock('./storage.js', () => ({
//   getData: jest.fn(),
//   addData: jest.fn(),
//   clearData: jest.fn(),
// }));

// // Setup the DOM before each test
// beforeEach(() => {
//   // Set up the basic DOM structure for the test
//   document.body.innerHTML = `
//     <select id="user-select">
//       <option value="1">user 1</option>
//       <option value="2">user 2</option>
//     </select>
//     <div id="agenda"></div>
//   `;
  
//   // Ensure the user-select element is available before the test
//   const userSelect = document.getElementById('user-select');
//   userSelect.value = '1'; // Simulate selecting user 1
// });

// describe('Date Calculations', () => {
//   test('Calculates correct revision dates', () => {
//     const startDate = '2025-07-19';
//     const expected = {
//       oneWeek: '2025-07-26',
//       oneMonth: '2025-08-19',
//       threeMonths: '2025-10-19',
//       sixMonths: '2026-01-19',
//       oneYear: '2026-07-19'
//     };
    
//     expect(getRevisionDates(startDate)).toEqual(expected);
//   });

//   test('Displays the agenda correctly for selected user', () => {
//     // Set up the mock data for getData
//     const mockAgenda = [
//       {
//         topic: 'Test Topic',
//         date: '2025-07-19',
//         revisions: getRevisionDates('2025-07-19')
//       }
//     ];

//     // Mock the getData function to return mock agenda items
//     getData.mockReturnValue(mockAgenda);

//     // Simulate the user selection change (trigger event)
//     const userSelect = document.getElementById('user-select');
//     userSelect.value = '1'; // Simulate selecting user 1
//     userSelect.dispatchEvent(new Event('change')); // Trigger the change event

//     // Call the showAgenda function to simulate showing the agenda
//     showAgenda();

//     // Check if agenda div contains the expected topic
//     const agendaDiv = document.getElementById('agenda');
//     expect(agendaDiv.innerHTML).toContain('Test Topic');
//   });
// });
