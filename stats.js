// stats.js

import jsonData from './db.js';

document.addEventListener('DOMContentLoaded', function () {
    // Check if jsonData is defined in scripts.js
    if (typeof jsonData !== 'undefined' && jsonData !== null) {
        console.log('jsonData is defined:', jsonData);

        // 1. Metal to Poetry Ratio
        var totalEntries = jsonData.length;
        var metalEntries = jsonData.filter(entry => entry.category === 'Metal').length
        var poetryEntries = jsonData.filter(entry => entry.category === 'Poetry').length;
        var poetryPercentage = (poetryEntries / totalEntries) * 100;
        var metalPercentage = (metalEntries / totalEntries) * 100;
        document.getElementById('poetryPercentage').innerHTML = poetryPercentage.toFixed(2) + '%';
        document.getElementById('metalPercentage').innerHTML = metalPercentage.toFixed(2) + '%';
        document.getElementById('metalCount').innerHTML = metalEntries;
        document.getElementById('poetryCount').innerHTML = poetryEntries;
        document.getElementById('totalCount').innerHTML = metalEntries + poetryEntries;
        document.getElementById('totalPercentage').innerHTML = poetryPercentage + metalPercentage + '%';

// Calculate Author counts
var authorCounts = {};
jsonData.forEach(entry => {
    var authorKey = entry.author + '-' + entry.category;
    authorCounts[authorKey] = (authorCounts[authorKey] || 0) + 1;
});

// Sort authorCounts by count in descending order
var sortedAuthors = Object.keys(authorCounts).sort((a, b) => authorCounts[b] - authorCounts[a]);

// Display the top 10 authors in the table
var tableBody = document.getElementById('authorCounts');
for (var i = 0; i < Math.min(10, sortedAuthors.length); i++) {
    var authorKey = sortedAuthors[i];
    var [author, category] = authorKey.split('-');
    var count = authorCounts[authorKey];
    
    // Create a new row in the table
    var row = tableBody.insertRow(i);
    var rankCell = row.insertCell(0);
    var authorCell = row.insertCell(1);
    var categoryCell = row.insertCell(2);
    var countCell = row.insertCell(3);

    // Populate the cells with data
    rankCell.textContent = i + 1;
    authorCell.textContent = author;
    categoryCell.textContent = category;
    countCell.textContent = count;
}

        // 3. Total Number of Entries
        document.getElementById('totalEntries').innerText = totalEntries;
    } else {
        console.error('jsonData is not defined. Make sure script.js is loaded.');
    }
});

console.log('jsonData in script.js:', jsonData);

