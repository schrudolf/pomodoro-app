import React from "react";
import localforage from "localforage";

class Pomodoro {
  updatePomodoroState: any;
  activeIntervalRef: any;
  constructor() {
    this.updatePomodoroState = null;
    this.activeIntervalRef = null;
  }
  public startTimer(intervalref?: any, setSettings?: any) {
    this.updatePomodoroState = setSettings;
    this.activeIntervalRef = intervalref;
    if (this.activeIntervalRef.current !== null) {
      return;
    } else {
      this.activeIntervalRef.current = window.setInterval(startInterval, 1000);
    }
  }
  public stopTimer(intervalref: any) {
    if (this.activeIntervalRef.current) {
      window.clearInterval(this.activeIntervalRef.current);
      this.activeIntervalRef.current = null;
    }
  }
  public async clockHandler() {
    const [timeValue, getCurrentState, getSelectedState, getCurrentStatus]: any = await this.getClockData();
    if (typeof timeValue === "string") {
      let parseTime = parseInt(timeValue) - 1;
      localforage.setItem(getCurrentState, parseTime.toString(), (err) => {
        if (err) throw err;
        localforage.getItem(
          getSelectedState,
          (err: any, defaultSelectedTime: string | null) => {
            if (typeof defaultSelectedTime === "string") {
              let getSelectedTime = parseInt(defaultSelectedTime);
              let getWorkTime = parseInt(timeValue);
              let calculateCurrentPercent = Math.round(
                100 - (getWorkTime / getSelectedTime) * 100
              );
              getCurrentStatus === 0 ? 
              this.updatePomodoroState((prevState: any) => ({
                ...prevState,
                percent: calculateCurrentPercent,
                workTime: parseTime.toString(),
              })) : 
              this.updatePomodoroState((prevState: any) => ({
                ...prevState,
                percent: calculateCurrentPercent,
                breakTime: parseTime.toString(),
              }));
              if (parseTime === 0) {
                localforage.setItem(getCurrentState, defaultSelectedTime, (err) => {
                  this.updatePomodoroStatus()
                })
              }
            }
          }
        );
      });
    }
  }
  private getClockData() {
    return new Promise(async (res) => {
      const getCurrentStatus = await localforage.getItem("status");
      let timeValue;
      let getCurrentState;
      let getSelectedState;
      if (getCurrentStatus === 0) {
        const workTimeValue = await localforage.getItem("workTime");
        timeValue = workTimeValue;
        getCurrentState = "workTime";
        getSelectedState = "selectedWorkTime";
        res([timeValue, getCurrentState, getSelectedState, getCurrentStatus]);
      } else if (getCurrentStatus === 1) {
        const breakTimeValue = await localforage.getItem("breakTime");
        timeValue = breakTimeValue;
        getCurrentState = "breakTime";
        getSelectedState = "selectedBreakTime";
        res([timeValue, getCurrentState, getSelectedState, getCurrentStatus]);
      } else {
        console.log("Longlong long break");
      }
    });
  }
  async updatePomodoroStatus(){
    const getCurrentStatus = await localforage.getItem("status");
    const remainingRounds = await localforage.getItem("rounds");
    const getNewRoundsValue = typeof remainingRounds === "number" && remainingRounds - 1;
    getCurrentStatus === 0 && await localforage.setItem("rounds", getNewRoundsValue);
    if (getNewRoundsValue === 0 && getCurrentStatus === 0) {
      console.log("Long Break starts");
    } else {
      const getNewStatus = getCurrentStatus === 0 ? 1 : 0;
      await localforage.setItem("status", getNewStatus);
      this.updatePomodoroState((prevState: any) => ({
        ...prevState,
        status: getNewStatus,
        rounds: getCurrentStatus === 0 ? prevState.rounds + 1 : prevState.rounds
      }));
      // pausePomodoroApp();
      // continuePomodoroApp();
    }
  }
}

const pomodoroHandler = new Pomodoro();

const startInterval = () => {
  pomodoroHandler.clockHandler();
};

export default pomodoroHandler;
