import { Injectable } from '@angular/core';
import { Singleton } from '../../CustomClass/Singleton';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  private timerInterval: number;
  private lectureData: { time: string, singleton: Singleton }[];

  constructor() {
    this.timerInterval = 1500;
    this.lectureData = [];
  }

  setTimerInterval(interval : number) {
    if (!isNaN(interval)) {
      this.timerInterval = interval;
    } else {
      this.timerInterval = 1500;
    }
  }

  getTimerInterval() {
    return this.timerInterval;
  }

  setLectureData(lectureData : { time: string, singleton: Singleton }[]) {
    if (typeof lectureData !== 'undefined' && lectureData.length > 0) { 
      this.lectureData = lectureData;
    } else {
      this.lectureData = [];
    }
  }

  getLectureData() {
    return this.lectureData;
  }


}
