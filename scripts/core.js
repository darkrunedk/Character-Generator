function firstLetterUppercase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var femaleNames = ["Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah"];
var maleNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Jeff"];

class Character {
  constructor() {
    this.name = "";
    this.gender = "";
    this.strength = 10;
    this.dexterity = 10;
    this.intelligence = 10;
    this.primaryMultiplier = 15;
    this.basicMultiplier = 0;
    this.class = "Basic";
  }
}

Character.prototype.Generate = function(characterClass, characterGender) {
  this.gender = firstLetterUppercase(characterGender);
  this.class = firstLetterUppercase(characterClass);

  var random_number = Math.random();

  switch (characterGender) {
    case "female":
      this.name = femaleNames[Math.floor(random_number * femaleNames.length)];
    break;
    default:
      this.name = maleNames[Math.floor(random_number * maleNames.length)];
    break;
  }

  random_number = Math.random();

  switch (characterClass) {
    case "warrior":
      this.strength = 10 + Math.floor(random_number * this.primaryMultiplier);

      this.name += " the " + this.class;
    break;
    case "ranger":
      this.dexterity = 10 + Math.floor(random_number * this.primaryMultiplier);

      this.name += " the " + this.class;
    break;
    case "mage":
      this.intelligence = 10 + Math.floor(random_number * this.primaryMultiplier);

      this.name += " the " + this.class;
    break;
    case "weakling":
      this.primaryMultiplier = 4;

      this.strength = 1 + Math.floor(random_number * this.primaryMultiplier);

      this.name += " the " + this.class.substr(0, 4);
    break;
    case "boss":
      this.primaryMultiplier = 25;
      this.basicMultiplier = 10;

      var bossTitles = ["Powerful", "Crazy"];
      var bossTitle = bossTitles[Math.floor(Math.random() * bossTitles.length)];

      this.name += " the " + bossTitle;

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

var gen_div = ".character-gen";
var gen_info = ".character-info";

$(".gen-btn").click(function() {
  // Creating character
  var character = new Character();

  // Values used to generate character
  var char_class = $(gen_div + " .char-class").val();
  var char_gender = $(gen_div + " .char-gender").val();

  // Generate character based on values
  character.Generate(char_class, char_gender);

  // Info
  $(".name").html(character.name);
  $(".gender").html(character.gender);
  $(".class").html(character.class);

  // Stats
  $(".str").html(character.strength);
  $(".dex").html(character.dexterity);
  $(".int").html(character.intelligence);

  // If info is hidden then show it
  if ($(gen_info + ":hidden")) {
    $(gen_info).show(300);
  }

  // Debug
  //console.log(character);
});
