import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  private subscription: Subscription|undefined;

  public hours:number|any = "00";
  public minutes:number|any = "00";
  public seconds:number|any = "00";

  public displayHours:number|any = "00";
  public displayMinutes: number|any = "00";
  public displaySeconds: number|any = "00";
  
  public timeLeft = new Date;
  private timeZero = new Date;

  public alarm:boolean = true;
  public alarmSound:any = new Audio('assets/sounds/loud_alarm_clock.mp3');

  public countDownColor = "black";
  public isStart:boolean = true;
  public startString:string= "start";
  public resetString:string = "reset";

  
  constructor() { 
    this.timeZero = new Date (this.timeZero.setHours(0,0,0));
  }

  ngOnInit() {
  }

  countDown(){
    this.timeLeft = new Date(this.timeLeft.getTime() - 1000);
    var copyTime = new Date(this.timeLeft.getTime());
    if (copyTime.getSeconds() < 10){
      this.displaySeconds = "0" + copyTime.getSeconds().toString();
    }else{
      this.displaySeconds = copyTime.getSeconds().toString();
    }

    if (copyTime.getMinutes() < 10){
      this.displayMinutes = "0" + copyTime.getMinutes().toString();
    }else{
      this.displayMinutes = copyTime.getMinutes().toString();
    }

    if (copyTime.getHours() < 10){
      this.displayHours = "0" + copyTime.getHours().toString();
    }else{
      this.displayHours = copyTime.getHours().toString();
    }

    if (this.timeLeft.getTime() == this.timeZero.getTime() ){

      this.countDownColor = 'red';
      this.isStart = true;

      if(this.alarm){
        this.alarmSound.load();
        this.alarmSound.play();
      }

      if (this.subscription !== undefined) {
        this.subscription.unsubscribe();
      }
    }
  }

  setTime(command:string){

    if (!(this.displayHours == "00" && this.displayMinutes == "00" && this.displaySeconds == "00") && command == "start"){
      this.timeLeft = new Date (this.timeLeft.setHours(Number(this.displayHours), Number(this.displayMinutes), Number(this.displaySeconds)));
      console.log("here");
      }else{
      this.timeLeft = new Date(this.timeLeft.setHours(this.hours, this.minutes, this.seconds));
      }
  }


  start(command:string){
    this.alarmSound.pause();
    this.countDownColor = 'black';

    if (!(this.displayHours == "00" && this.displayMinutes == "00" && this.displaySeconds == "00") && command == "start"){
  
    }else if (command == "reset" || command == "start" ){ 

      if (Number(this.seconds) < 10){
        this.displaySeconds = "0" + Number(this.seconds).toString();
      }else{
        this.displaySeconds = Number(this.seconds).toString();
      }

      if (Number(this.minutes < 10)){
        this.displayMinutes = "0" + Number(this.minutes).toString();
      }else{
        this.displayMinutes = Number(this.minutes).toString();
      }

      if (Number(this.hours) < 10 || this.hours.toString() !== "00"){
        this.displayHours = "0" + Number(this.hours).toString();
      }else{
        this.displayHours = Number(this.hours).toString();
      }

      if (command == "reset" ){
        this.isStart = true;
        if (this.subscription != undefined) {
          this.subscription.unsubscribe();
        return;
        }
      }
  }

    this.setTime(command);

    this.countDownColor = "black";
    this.isStart = !this.isStart;

    if (this.subscription && !this.subscription.closed){
      if (this.subscription != undefined) {
        this.subscription.unsubscribe();
      }
    }
      this.subscription = interval(1000)
      .subscribe(x => { this.countDown();});
  }

  stop(){
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }
    this.isStart = !this.isStart;
  }

  changeAlarm(){
    this.alarm = !this.alarm;

    if(this.alarm){
      this.alarmSound.play();
    }else{
      this.alarmSound.pause();
    }
    
  }

  ngOnDestroy() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

}
