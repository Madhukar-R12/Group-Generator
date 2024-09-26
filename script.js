// Function to shuffle an array randomly
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

// Function to divide the names into groups
function divideIntoGroups(names, numGroups) {
  var groups = [];
  var shuffledNames = shuffleArray(names.slice()); // Make a copy and shuffle it

  // Initialize groups
  for (var i = 0; i < numGroups; i++) {
      groups[i] = [];
  }

  // Distribute names evenly into groups
  while (shuffledNames.length > 0) {
      for (var i = 0; i < numGroups; i++) {
          if (shuffledNames.length === 0) break; // Exit if there are no more names

          var name = shuffledNames.pop();
          if (name) {
              groups[i].push(name);
          }
      }
  }

  return groups;
}

// Function to retrieve names from input and validate
function getNamesFromInput() {
  var nameInput = document.getElementById("nameInput");
  var namesString = nameInput.value.trim();

  if (namesString === "") {
      alert("Please enter names separated by commas.");
      return null;
  }

  var names = namesString.split(",").map(function(name) {
      return name.trim();
  });

  return names;
}

// Generate groups and display them on the webpage
function generateGroups() {
  var names = getNamesFromInput();
  if (!names) {
      return;
  }

  var numGroupsInput = document.getElementById("numGroupsInput");
  var numGroups = parseInt(numGroupsInput.value);

  if (isNaN(numGroups) || numGroups <= 0) {
      alert("Please enter a valid number of groups.");
      return;
  }

  var groups = divideIntoGroups(names, numGroups);

  var groupContainer = document.getElementById("groupContainer");
  groupContainer.innerHTML = ""; // Clear previous groups

  // Add the padded class if there are groups to display
  var backgroundContainer = document.getElementById("backgroundContainer");
  if (groups.length > 0) {
      backgroundContainer.classList.add("padded");
  } else {
      backgroundContainer.classList.remove("padded");
  }

  for (var i = 0; i < numGroups; i++) {
      var groupDiv = document.createElement("div");
      groupDiv.classList.add("group");
      groupDiv.innerHTML = "<h3>Group " + (i + 1) + "</h3>";

      var namesList = document.createElement("ul");
      for (var j = 0; j < groups[i].length; j++) {
          var nameItem = document.createElement("li");
          nameItem.textContent = groups[i][j];
          namesList.appendChild(nameItem);
      }

      groupDiv.appendChild(namesList);
      groupContainer.appendChild(groupDiv);
  }
}

// Generate groups when the page loads
window.onload = function() {
  var generateButton = document.getElementById("generateButton");
  generateButton.addEventListener("click", generateGroups);
};
