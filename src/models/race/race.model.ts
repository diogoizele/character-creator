export class Race {
  private id: number;
  private name: string;
  private description: string;
  private icon: string;

  constructor(id: number, name: string, description: string, icon: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getIcon(): string {
    return this.icon;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setIcon(icon: string): void {
    this.icon = icon;
  }

  public toString(): string {
    return this.name;
  }
}
