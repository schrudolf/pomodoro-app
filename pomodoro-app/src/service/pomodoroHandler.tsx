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
    this.activeIntervalRef = intervalref;
    if (this.activeIntervalRef.current) {
      window.clearInterval(this.activeIntervalRef.current);
      this.activeIntervalRef.current = null;
    }
  }
  public async clockHandler() {
    try {
      const [
        timeValue,
        getCurrentState,
        getSelectedStateTime,
        getCurrentStatus,
      ]: any = await this.getClockData();
      let parseTime = parseInt(timeValue) - 1;
      await localforage.setItem(getCurrentState, parseTime.toString());
      const selectedStateTime = await localforage.getItem(getSelectedStateTime);
      let getSelectedTime = parseInt(selectedStateTime as string);
      let getWorkTime = parseInt(timeValue);
      let calculateCurrentPercent = Math.round(
        100 - (getWorkTime / getSelectedTime) * 100
      );
      this.updateCurrentState(
        getCurrentStatus,
        calculateCurrentPercent,
        parseTime
      );
      if (parseTime === 0) {
        await localforage.setItem(getCurrentState, selectedStateTime);
        this.updatePomodoroStatus();
      }
    } catch (err) {
      console.log(err);
    }
  }
  private getClockData() {
    return new Promise(async (res) => {
      const getCurrentStatus = await localforage.getItem("status");
      let timeValue;
      let getCurrentState;
      let getSelectedStateTime;
      if (getCurrentStatus === 0) {
        const workTimeValue = await localforage.getItem("workTime");
        timeValue = workTimeValue;
        getCurrentState = "workTime";
        getSelectedStateTime = "selectedWorkTime";
        res([
          timeValue,
          getCurrentState,
          getSelectedStateTime,
          getCurrentStatus,
        ]);
      } else if (getCurrentStatus === 1) {
        const breakTimeValue = await localforage.getItem("breakTime");
        timeValue = breakTimeValue;
        getCurrentState = "breakTime";
        getSelectedStateTime = "selectedBreakTime";
        res([
          timeValue,
          getCurrentState,
          getSelectedStateTime,
          getCurrentStatus,
        ]);
      } else {
        console.log("Longlong long break");
      }
    });
  }
  async updatePomodoroStatus() {
    try {
      const getCurrentStatus = await localforage.getItem("status");
      const remainingRounds = await localforage.getItem("rounds");
      const getNewRoundsValue =
        typeof remainingRounds === "number" && remainingRounds - 1;
      getCurrentStatus === 0 &&
        (await localforage.setItem("rounds", getNewRoundsValue));
      if (getNewRoundsValue === 0 && getCurrentStatus === 0) {
        console.log("Long Break starts");
      } else {
        const getNewStatus = getCurrentStatus === 0 ? 1 : 0;
        await localforage.setItem("status", getNewStatus);
        this.updatePomodoroState((prevState: any) => ({
          ...prevState,
          status: getNewStatus,
          rounds:
            getCurrentStatus === 0 ? prevState.rounds + 1 : prevState.rounds,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  }
  updateCurrentState(
    getCurrentStatus: number,
    calculateCurrentPercent: number,
    parseTime: number
  ) {
    if (getCurrentStatus === 0) {
      this.updatePomodoroState((prevState: any) => ({
        ...prevState,
        percent: calculateCurrentPercent,
        workTime: parseTime.toString(),
      }));
    } else if (getCurrentStatus === 1) {
      this.updatePomodoroState((prevState: any) => ({
        ...prevState,
        percent: calculateCurrentPercent,
        breakTime: parseTime.toString(),
      }));
    } else {
      console.log("long long pomo2 update state");
    }
  }
  async resetTimes(setSettings: any, intervalref: any) {
    try {
      const selectedWorkTime = await localforage.getItem("selectedWorkTime");
      const selectedBreakTime = await localforage.getItem("selectedBreakTime");
      await localforage.setItem("workTime", selectedWorkTime);
      await localforage.setItem("breakTime", selectedBreakTime);
      await localforage.setItem("status", 0);
      setSettings((prevState: any) => ({
        ...prevState,
        workTime: selectedWorkTime,
        breakTime: selectedBreakTime,
        percent: 0,
        status: 0,
      }));
      this.stopTimer(intervalref);
    } catch (err) {
      console.log(err);
    }
  }
  async fullReset(setSettings: any, intervalref: any) {
    try {
      const selectedWorkTime = await localforage.getItem("selectedWorkTime");
      const selectedBreakTime = await localforage.getItem("selectedBreakTime");
      const selectedRoundsValue = await localforage.getItem("selectedRounds");
      await localforage.setItem("workTime", selectedWorkTime);
      await localforage.setItem("breakTime", selectedBreakTime);
      await localforage.setItem("selectedRounds", selectedRoundsValue);
      await localforage.setItem("rounds", 0);
      await localforage.setItem("status", 0);
      setSettings((prevState: any) => ({
        ...prevState,
        workTime: selectedWorkTime,
        breakTime: selectedBreakTime,
        selectedRounds: selectedRoundsValue,
        rounds: 0,
        percent: 0,
        status: 0,
      }));
      this.stopTimer(intervalref);
    } catch (err) {
      console.log(err);
    }
  }
}

const pomodoroHandler = new Pomodoro();

const startInterval = () => {
  pomodoroHandler.clockHandler();
};

export default pomodoroHandler;
