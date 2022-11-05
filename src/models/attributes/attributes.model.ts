export type AttributeName =
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "charisma"
  | "power"
  | "agility"
  | "stealth"
  | "perception";

export interface AttributeObject {
  id: number;
  name: string;
  value: number;
}

export type Attributes = {
  [key in AttributeName]: AttributeObject;
}
