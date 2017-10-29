function firstLetterUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Button states
var buttonStates = {
  default: function(button) {
    $(button).text("Generate");
    $(button).css({
      "backgroundColor": "#CCC",
      "borderColor": "#000",
      "color": "#000"
    });
  },
  click: function(button) {
    $(button).text("Generating...");
    $(button).css({
      "backgroundColor": "#23d160",
      "borderColor": "#fff",
      "color": "#fff"
    });
  }
};

// Races
var races = ["human", "wood elf", "dark elf"];

// Names
var names = [];

// Create an array for each race
for (var i = 0; i < races.length; i++) {
  names[races[i]] = [];
}

// Human
names[races[0]]["male"] = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Jeff"];
names[races[0]]["female"] = ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah"];

// Elf
names[races[1]]["male"] = ["Arathor", "Bragor", "Clendil", "Engaer", "Fargoth", "Galmir", "Nalion", "Thoronor"];
names[races[1]]["female"] = ["Anrel", "Ardhil", "Cirwedh", "Dothiel", "Elphiron", "Falion", "Galdiir", "Indrel", "Nilioniel"];

// Dark elf
names[races[2]]["male"] = ["Arvel", "Drovas", "Falas", "Garyn", "Tendris", "Vanel"];
names[races[2]]["female"] = ["Alvesa", "Dilvene", "Nilvyn", "Ravela", "Teleri", "Varona"];


class Character {
  constructor() {
    this.name = "";
    this.gender = "";
    this.race = "";
    this.title = "";
    this.strength = 10;
    this.dexterity = 10;
    this.intelligence = 10;
    this.primaryMultiplier = 15;
    this.basicMultiplier = 0;
    this.class = "Basic";
  }
}

Character.prototype.Generate = function(characterClass, characterGender, characterRace) {
  this.gender = firstLetterUppercase(characterGender);
  this.class = firstLetterUppercase(characterClass);
  this.race = firstLetterUppercase(characterRace);

  // Set the nameTable that should be used
  var nameTable = names[characterRace];

  var random_number = Math.random();

  this.name = nameTable[characterGender][Math.floor(random_number * nameTable[characterGender].length)];

  random_number = Math.random();

  switch (characterClass) {
    case "warrior":
      this.strength = 10 + Math.floor(random_number * this.primaryMultiplier);

      this.title = "the " + this.class;
    break;
    case "ranger":
      this.dexterity = 10 + Math.floor(random_number * this.primaryMultiplier);

      this.title = "the " + this.class;
    break;
    case "mage":
      this.intelligence = 10 + Math.floor(random_number * this.primaryMultiplier);

      this.title = "the " + this.class;
    break;
    case "weakling":
      this.primaryMultiplier = 4;

      this.strength = 1 + Math.floor(random_number * this.primaryMultiplier);

      this.title = "the " + this.class.substr(0, 4);
    break;
    case "boss":
      this.primaryMultiplier = 25;
      this.basicMultiplier = 10;

      var bossTitles = ["Powerful", "Crazy"];
      var bossTitle = bossTitles[Math.floor(Math.random() * bossTitles.length)];

      this.title = "the " + bossTitle;

      switch (bossTitle) {
        case "Crazy":
          this.strength = 30 + Math.floor(random_number * this.basicMultiplier);
          this.dexterity = 30 + Math.floor(random_number * this.basicMultiplier);
          this.intelligence = 30 + Math.floor(random_number * this.basicMultiplier);
        break;
        default:
          this.strength = 30 + Math.floor(random_number * this.primaryMultiplier);
          this.dexterity = 30 + Math.floor(random_number * this.basicMultiplier);
          this.intelligence = 30 + Math.floor(random_number * this.basicMultiplier);
        break;
      }

    break;
    default:
    break;
  }
};

var generator = {
  elements: [".char-class", ".char-gender", ".char-race"],
  parts: [".character-gen", ".character-info"],
  info: [".name", ".title", ".gender", ".race", ".class"],
  stats: [".str", ".dex", ".int"]
};

$(document).ready(function() {
  // Populating the race select menu with the races
  $.each(races, function(k,v) {
    var k = firstLetterUppercase(v);
    $(generator.parts[0] + " " + generator.elements[2]).append($("<option>", { value : v }).text(k));
  });
});

$(".gen-btn").click(function() {
  // Change button state (mostly for users with slow devices/connection)
  buttonStates.click($(this));

  // Creating character
  var character = new Character();

  // Values used to generate character
  var values = [];
  for (var i = 0; i < generator.elements.length; i++) {
    var value = $(generator.parts[0] + " " + generator.elements[i]).val();
    values.push(value);
  }
  var char_class = values[0];
  var char_gender = values[1];
  var char_race = values[2];

  // Generate character based on values
  character.Generate(char_class, char_gender, char_race);

  // Info
  $(generator.info[0]).html(character.name);
  $(generator.info[1]).html(character.title);
  $(generator.info[2]).html(character.gender);
  $(generator.info[3]).html(character.race);
  $(generator.info[4]).html(character.class);

  // Stats
  $(generator.stats[0]).html(character.strength);
  $(generator.stats[1]).html(character.dexterity);
  $(generator.stats[2]).html(character.intelligence);

  // Set button state to default again
  buttonStates.default($(this));

  // If info is hidden then show it
  var gen_info = generator.parts[1];
  if ($(gen_info + ":hidden")) {
    $(gen_info).show(300);
  }

  // Debug
  //console.log(character);
});
