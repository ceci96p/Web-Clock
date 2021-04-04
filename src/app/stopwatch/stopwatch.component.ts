import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

export interface Lap {
  title: String;
  time: String;
}

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})

export class StopwatchComponent implements OnInit {

  private subscription: Subscription|undefined;

  public hours:number = 0;
  public minutes:number = 0;
  public seconds:number = 0;

  public displayHours:number|any = "00";
  public displayMinutes: number|any = "00";
  public displaySeconds: number|any = "00";

  public time = new Date;

  public startString:string= "start";
  public stopString:string= "stop";
  public resetString:string = "reset";

  public lapCount = 0;
  public lapArray: Lap[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  updateTime(command:string){
    this.time = new Date(this.time.getTime() + 1000);

    //Used to always display at least 2 digits at all times for seconds, minutes and hours
    if (this.time.getSeconds() < 10){
      this.displaySeconds = "0" + this.time.getSeconds().toString();
    }else{
      this.displaySeconds = this.time.getSeconds().toString();
    }

    if (this.time.getMinutes() < 10){
      this.displayMinutes = "0" + this.time.getMinutes().toString();
    }else{
      this.displayMinutes = this.time.getMinutes().toString();
    }

    if (this.time.getHours() < 10){
      this.displayHours = "0" + this.time.getHours().toString();
    }else{
      this.displayHours = this.time.getHours().toString();
    }

    this.seconds = this.time.getSeconds();
    this.minutes = this.time.getMinutes();
    this.hours = this.time.getHours();

  }

  execute(command:string){
    
      //Used to always display at least 2 digits at all times for seconds, minutes and hours
      if (Number(this.seconds) < 10){ 
        this.displaySeconds = "0" + Number(this.seconds).toString();
      }else {
        this.displaySeconds = Number(this.seconds).toString();
      }
      if (Number(this.minutes < 10)){
        this.displayMinutes = "0" + Number(this.minutes).toString();
      }else{
        this.displayMinutes = Number(this.minutes).toString();
      }
      if (Number(this.hours) < 10){
        this.displayHours = "0" + Number(this.hours).toString();
      }else{
        this.displayHours = Number(this.hours).toString();
      }

      this.time = new Date (this.time.setHours(this.hours,this.minutes, this.seconds));

      this.subscription = interval(1000)
      .subscribe(x => { this.updateTime(command);});

  }

  lap(){
    this.lapCount++;
    let title = "Lap " + this.lapCount;
    let time = this.displayHours + " : " + this.displayMinutes + " : " + this.displaySeconds;
    let lap: Lap = { title: title, time:time };

    console.log("lap: " + lap);

    this.lapArray.push(lap);

  }

  reset(){
    this.stop();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;

    this.displayHours = "00";
    this.displayMinutes = "00";
    this.displaySeconds = "00";

  }

  stop(){
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
  }

}
