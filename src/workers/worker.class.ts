export abstract class Worker {
  protected isRunning: boolean;
  constructor(protected readonly frequency: number) {}
  async start() {
    this.isRunning = true;
  }
  async stop() {
    this.isRunning = false;
  }

  protected async sleep(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
