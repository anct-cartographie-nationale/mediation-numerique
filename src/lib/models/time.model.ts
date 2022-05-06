export class Time {
  opening: string;
  closing: string;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  public formatOpeningDate(): string {
    return this.formatDate(this.opening);
  }

  public formatClosingDate(): string {
    return this.formatDate(this.closing);
  }

  private formatDate(n: string): string {
    return n.replace(':', 'h');
  }
}
