export interface RaceInterface {
  getId(): number;
  getName(): string;
  getDescription(): string;
  getIcon(): string;

  setId(id: number): void;
  setName(name: string): void;
  setDescription(description: string): void;
  setIcon(icon: string): void;

  toString(): string;
}
