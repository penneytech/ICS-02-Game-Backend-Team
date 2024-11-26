import { getGlobal, setGlobal } from '../globals.js';

export default function generateUserStats() {

  const userStats = getGlobal('userstats');
  const userstatsdiv = document.getElementById('userstatsdiv');
  const contentDiv = document.getElementById('content');

  // Create the user stats div
  const customization = document.createElement('div');
  customization.setAttribute('id', 'customization');

  userstatsdiv.appendChild(customization);

  // Create a table inside of the user stats div
  const table = document.createElement('table');
  table.style.width = '100%';
  customization.appendChild(table);

  // Create title row
  const titleRow = document.createElement('tr');
  table.appendChild(titleRow);
  const titleCell = document.createElement('th');
  titleCell.colSpan = 2;
  titleCell.textContent = 'User Stats';
  titleCell.style.padding = '15px';
  titleCell.style.fontSize = '24px';
  titleCell.style.fontWeight = 'bold';
  titleCell.style.color = 'white';
  titleRow.appendChild(titleCell);

  // Create an array of user stat names
  const statNames = ['Username', 'Character', 'Element', 'Top Score', 'Total Points', 'Times Played'];

  // Check if userStats is null or empty

  console.log("userStats", userStats);
  
  if (!userStats || Object.keys(userStats).length === 0) {
    const dataRow = document.createElement('tr');
    table.appendChild(dataRow);

    const dataCell = document.createElement('td');
    dataCell.colSpan = 2;
    dataCell.style.textAlign = 'center';
    dataCell.style.fontWeight = 'bold';
    dataCell.textContent = 'No user stats available.';
    dataRow.appendChild(dataCell);
  } else {
    // Create data rows
    const statValues = ['username', 'character', 'element', 'topScore', 'totalScore', 'historyCount'];

    for (let i = 0; i < statNames.length; i++) {
      const dataRow = document.createElement('tr');
      table.appendChild(dataRow);

      const dataCell1 = document.createElement('td');
      dataCell1.style.textAlign = 'left';
      dataCell1.style.fontWeight = 'bold';
      dataCell1.textContent = statNames[i];

      const dataCell2 = document.createElement('td');
      dataCell2.style.textAlign = 'right';
      dataCell2.style.fontWeight = 'bold';
      dataCell2.textContent = userStats[statValues[i]];
      dataRow.appendChild(dataCell1);
      dataRow.appendChild(dataCell2);

      if (statNames[i] === 'Character') {
        dataCell2.setAttribute('data-stat', 'Character');
      }
    }
  }

  contentDiv.appendChild(userstatsdiv);
}