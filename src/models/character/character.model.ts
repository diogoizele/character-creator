import { Attributes } from "../attributes/attributes.model";
import { Race } from "../race/race.model";

export class Character {
  private name: string;
  private race: Race;
  private attributes: Attributes;
  private image: string;
  private level: number;
  private experience: number;
  private basicDamage: number;
  private basicHealth: number;
  private basicMana: number;

  constructor(
    name: string,
    race: Race,
    attributes: Attributes,
    image: string,
    level: number,
    experience: number,
    basicDamage: number,
    basicHealth: number,
    basicMana: number
  ) {
    this.name = name;
    this.race = race;
    this.attributes = attributes;
    this.image = image;
    this.level = level;
    this.experience = experience;
    this.basicDamage = basicDamage;
    this.basicHealth = basicHealth;
    this.basicMana = basicMana;
  }

  public getName(): string {
    return this.name;
  }

  public getRace(): Race {
    return this.race;
  }

  public getAttributes(): Attributes {
    return this.attributes;
  }

  public getImage(): string {
    return this.image;
  }

  public getLevel(): number {
    return this.level;
  }

  public getExperience(): number {
    return this.experience;
  }

  public getBasicDamage(): number {
    return this.basicDamage;
  }

  public getBasicHealth(): number {
    return this.basicHealth;
  }

  public getBasicMana(): number {
    return this.basicMana;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setRace(race: Race): void {
    this.race = race;
  }

  public setAttributes(attributes: Attributes): void {
    this.attributes = attributes;
  }

  public setImage(image: string): void {
    this.image = image;
  }

  public setLevel(level: number): void {
    this.level = level;
  }

  public setExperience(experience: number): void {
    this.experience = experience;
  }

  public setBasicDamage(basicDamage: number): void {
    this.basicDamage = basicDamage;
  }

  public setBasicHealth(basicHealth: number): void {
    this.basicHealth = basicHealth;
  }

  public setBasicMana(basicMana: number): void {
    this.basicMana = basicMana;
  }
}
