export class Singleton {
  
  private name: string;
  private startTime: Date;
  private endTime: Date;
  private room: string;

  constructor(name: string, startTime: Date, endTime: Date, room: string) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
  }

  public getName() {
    return this.name;
  }

  public getStartTime() {
    return this.startTime;
  }

  public getStartTimeAMPM() {
    return this.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(" ", "");
  }

  public getEndTime() {
    return this.endTime;
  }

  public getEndTimeAMPM() {
    return this.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(" ", "");
  }

  public getRoom() {
    return this.room;
  }

  public getObject() {
    return {
      name: this.name,
      startTime: this.startTime,
      endTime: this.endTime,
      room: this.room
    };
  }
}