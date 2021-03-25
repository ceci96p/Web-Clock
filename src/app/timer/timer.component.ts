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
  
  constructor() { 
    this.timeZero = new Date (this.timeZero.setHours(0,0,0));
  }

  ngOnInit() {
  }

  countDown(){
    this.timeLeft = new Date(this.timeLeft.getTime() - 1000);
    this.displaySeconds = this.timeLeft.getSeconds();
    this.displayMinutes = this.timeLeft.getMinutes();
    this.displayHours =this.timeLeft.getHours();

    if (this.timeLeft.getTime() == this.timeZero.getTime() ){
      if (this.subscription !== undefined) {
        this.subscription.unsubscribe();
      }
    }
  }

  setTime(){
    this.timeLeft = new Date(this.timeLeft.setHours(this.hours, this.minutes, this.seconds));
  }

  start(){
    this.setTime();
    this.subscription = interval(1000)
      .subscribe(x => { this.countDown();});
  }

  stop(){
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy() {

    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }

}
