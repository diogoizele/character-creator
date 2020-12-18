class Character {
  constructor(characteristics, attributes, status, inventory, image) {
    this.characteristics = characteristics;
    this.attributes = attributes;
    this.status = status;
    this.inventory = inventory;
    this.image = image
  }
}

class Characteristics {
  constructor(
    name,
    race,
    prefession,
    gender,
    age,
    weight,
    height,
    trend,
    element = null
  ) {
    this.name = name;
    this.race = race;
    this.prefession = prefession;
    this.gender = gender;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.trend = trend;
    this.element = element;
  }
}

class Attributes {
  constructor(
    force,
    power,
    constituition,
    dexterity,
    perception,
    intelligence,
    agility,
    charisma,
    stealth
  ) {
    this.force = force;
    this.power = power;
    this.constituition = constituition;
    this.dexterity = dexterity;
    this.perception = perception;
    this.intelligence = intelligence;
    this.agility = agility;
    this.charisma = charisma;
    this.stealth = stealth;
  }
}

class Status {
  constructor(level, xp, basicAttack, health, mana) {
    this.level = level;
    this.xp = xp;
    this.basicAttack = basicAttack;
    this.health = health;
    this.mana = mana;
  }
}

class Inventory {
  constructor(gold, items = []) {
    this.gold = gold;
    this.items = items;
  }
}
