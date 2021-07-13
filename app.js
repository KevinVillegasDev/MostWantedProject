"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      let newSearchType = promptFor(
        "Which of the following traits would you like to search by? Dob, Height, Weight, eyeColor, or Occupation? If multiple, enter multiple",
        autoValid
      );
      switch (newSearchType) {
        case "DOB":
          searchResults = searchByDateOfBirth(people);
          displayPeople(searchResults);
          break;
        case "Gender":
          searchResults = searchByGender(people);
          displayPeople(searchResults);
          break;
        case "Height":
          searchResults = searchByHeight(people);
          displayPeople(searchResults);
          break;
        case "Weight":
          searchResults = searchByWeight(people);
          displayPeople(searchResults);
          break;
        case "eyeColor":
          searchResults = searchByEyeColor(people);
          displayPeople(searchResults);
          break;
        case "Occupation":
          searchResults = searchByOccupation(people);
          displayPeople(searchResults);
          break;
        case "multiple":
          searchResults = searchByMultipleTraits(people);
          displayPeople(searchResults);
          break;
      }
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " +
      person[0].firstName +
      " " +
      person[0].lastName +
      " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'",
    autoValid
  );

  switch (displayOption) {
    case "info":
      alert(displayPerson(person));
      break;
    case "family":
      let spouse = searchBySpouse(person, people);
      // let siblings = searchBySiblings(person,people);  //search for persons with matching parents of person
      // let parents = searchByParents(person,people);
      alert(spouse[0].firstName + " " + spouse[0].lastName);
      // alert(`${spouse[0].firstName} ${spouse[0].lastName} is ${person[0].firstName}'s spouse.\n`);
      break;
    case "descendants":
      alert(descendantsRecursion(people, person));

      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}
function descendantsRecursion(people, person) {
  //two for loops, uses .include and .concat
  let descendantArray = [];
  for (let i = 0; i < people.length; i++) {
    if (people[i].id === person[i].id) {
      descendantArray.push(person[i].id);
      return descendantArray;
    }
  }

  for (let i = 0; i < newArray.length; i++) {} //
}

function searchBySpouse(person, people) {
  let foundSpouse = people.filter(function (potentialMatch) {
    if (potentialMatch.id === person[0].currentSpouse) {
      return true;
    } else {
      return false;
    }
  });

  return foundSpouse;
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (
      potentialMatch.firstName === firstName &&
      potentialMatch.lastName === lastName
    ) {
      return true;
    } else {
      return false;
    }
  });
  return foundPerson;
}

function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the person's eye color?", autoValid);

  let foundEyeColor = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  });
  return foundEyeColor;
}

function searchByOccupation(people) {
  let occupation = promptFor("What is the person's occupation?", autoValid);

  let foundOccupation = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    } else {
      return false;
    }
  });
  return foundOccupation;
}

function searchByDateOfBirth(people) {
  let dob = promptFor(
    "What is the persons date of birth? Use MM/DD/YYYY",
    autoValid
  );
  let foundDob = people.filter(function (potentialMatch) {
    if (potentialMatch.dob === dob) {
      return true;
    } else {
      return false;
    }
  });
  return foundDob;
}

function searchByHeight(people) {
  let height = promptFor("What is the person's height?", autoValid);

  let foundHeight = people.filter(function (potentialMatch) {
    if (potentialMatch.height === height) {
      return true;
    } else {
      return false;
    }
  });

  return foundHeight;
}

function searchByGender(people) {
  let gender = promptFor("What is the person's gender?", autoValid);

  let foundGender = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    } else {
      return false;
    }
  });
  return foundGender;
}

function searchByWeight(people) {
  let weight = promptFor("What is the person's weight?", autoValid);

  let foundWeight = people.filter(function (potentialMatch) {
    if (potentialMatch.foundWeight === weight) {
      return true;
    } else {
      return false;
    }
  });
  return foundWeight;
}

function searchByMultipleTraits(people) {
  let searchResults = people;
  let eyeColorSearch = promptFor("Do you know their eyeColor?", yesNo);
  if (eyeColorSearch == "yes") {
    searchResults = searchByEyeColor(searchResults);
  }
  let genderSearch = promptFor("Do you know their gender?", yesNo);
  if (genderSearch == "yes") {
    searchResults = searchByGender(searchResults);
  }
  let dobSearch = promptFor("Do you know their dob?", yesNo);
  if (dobSearch == "yes") {
    searchResults = searchByDateOfBirth(searchResults);
  }
  let heightSearch = promptFor("Do you know their height?", yesNo);
  if (heightSearch == "yes") {
    searchResults = searchByHeight(searchResults);
  }
  let weightSearch = promptFor("Do you know their weight?", yesNo);
  if (weightSearch == "yes") {
    searchResults = searchByWeight(searchResults);
  }
  let occupationSearch = promptFor("Do you know their occupation?", yesNo);
  if (occupationSearch == "yes") {
    searchResults = searchByOccupation(searchResults);
  }
  return searchResults;
}
//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Gender: " + person[0].gender + "\n";
  personInfo += "DOB: " + person[0].dob + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  personInfo += "Occupation: " + person[0].occupation + "\n";

  return personInfo;
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color givalidation for example.
function customValidationEyeColor(input) {
  //brown black hazel green blue
  if (input.toLowerCase == "blue") {
    return true;
  } else if (input.toLowerCase === "green") {
    return true;
  } else if (input.toLowerCase === "hazel") {
    return true;
  } else if (input.toLowerCase === "black") {
    return true;
  } else if (input.toLowerCase === "brown") {
    return true;
  } else {
    return false;
  }
}

//adding comment line for pull test
//#endregion
