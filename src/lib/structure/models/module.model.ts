export class Module {
  id: string;
  text: string;
  count: number;
  displayText?: string;

  constructor(id: string, text: string, displayText?: string) {
    this.id = id;
    this.text = text;
    this.displayText = displayText;
  }
}
