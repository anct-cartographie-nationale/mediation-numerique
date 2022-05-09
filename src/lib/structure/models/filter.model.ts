export class Filter {
  name: string;
  value: string;
  text?: string;
  checked: boolean;

  constructor(name: string, value: any, text?: string) {
    this.name = name;
    this.value = value.toString();
    this.text = text;
    this.checked = true;
  }
}
