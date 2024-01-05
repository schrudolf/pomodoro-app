import localforage from "localforage";
import { AppSettings } from "../models/settings";
const audioFile = require("../assets/audio.mp3");

class Pomodoro {
  updatePomodoroState: any;
  activeIntervalRef: any;
  constructor() {
    this.updatePomodoroState = null;
    this.activeIntervalRef = null;
  }
  public startTimer(
    intervalref?: React.MutableRefObject<number | null>,
    setSettings?: React.Dispatch<React.SetStateAction<AppSettings>>
  ) {
    this.updatePomodoroState = setSettings;
    this.activeIntervalRef = intervalref;
    if (this.activeIntervalRef.current !== null) {
      return;
    } else {
      this.activeIntervalRef.current = window.setInterval(startInterval, 1000);
    }
  }
  public stopTimer(intervalref: React.MutableRefObject<number | null>) {
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
      ]: [string, string, string, number] = await this.getClockData();
      let parseTime = parseInt(timeValue) - 1;
      await localforage.setItem(getCurrentState, parseTime.toString());
      const selectedStateTime = await localforage.getItem(getSelectedStateTime);
      let getSelectedTime = parseInt(selectedStateTime as string);
      let getWorkTime = parseInt(timeValue);
      let calculateCurrentPercent = Math.floor(
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
  private getClockData(): Promise<[string, string, string, number]> {
    return new Promise(async (res) => {
      const getCurrentStatus = await localforage.getItem("status");
      let timeValue: string;
      let getCurrentState: string;
      let getSelectedStateTime: string;
      if (getCurrentStatus === 0) {
        const workTimeValue = await localforage.getItem("workTime");
        timeValue = workTimeValue as string;
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
        timeValue = breakTimeValue as string;
        getCurrentState = "breakTime";
        getSelectedStateTime = "selectedBreakTime";
        res([
          timeValue,
          getCurrentState,
          getSelectedStateTime,
          getCurrentStatus,
        ]);
      } else {
        const longBreakTimeValue = await localforage.getItem("longBreakTime");
        timeValue = longBreakTimeValue as string;
        getCurrentState = "longBreakTime";
        getSelectedStateTime = "selectedLongBreakTime";
        res([
          timeValue,
          getCurrentState,
          getSelectedStateTime,
          getCurrentStatus as number,
        ]);
      }
    });
  }
  private async updatePomodoroStatus() {
    try {
      const getCurrentStatus = await localforage.getItem("status");
      const remainingRounds = (await localforage.getItem("rounds")) as number;
      const selectedRounds = (await localforage.getItem(
        "selectedRounds"
      )) as number;
      getCurrentStatus === 0 &&
        (await localforage.setItem("rounds", remainingRounds - 1));
      this.playAudio();
      let isFinalStage =
        selectedRounds - (remainingRounds - 1) === selectedRounds;
      let isFinalStateButWasReset =
        selectedRounds - remainingRounds === selectedRounds;
      // after longbreak
      if (getCurrentStatus === 2) {
        await localforage.setItem("status", 3);
        this.updatePomodoroState((prevState: AppSettings) => ({
          ...prevState,
          status: 3,
          percent: 100,
        }));
        this.stopTimer(this.activeIntervalRef);
      }
      // after last round
      else if (
        (isFinalStage || isFinalStateButWasReset) &&
        getCurrentStatus === 0
      ) {
        await localforage.setItem("status", 2);
        this.updatePomodoroState((prevState: AppSettings) => ({
          ...prevState,
          status: 2,
          rounds: prevState.rounds - 1,
        }));
        // work or break
      } else {
        const getNewStatus = getCurrentStatus === 0 ? 1 : 0;
        await localforage.setItem("status", getNewStatus);
        this.updatePomodoroState((prevState: AppSettings) => ({
          ...prevState,
          status: getNewStatus,
          rounds:
            getCurrentStatus === 0 ? prevState.rounds - 1 : prevState.rounds,
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
      this.updatePomodoroState((prevState: AppSettings) => ({
        ...prevState,
        percent: calculateCurrentPercent,
        workTime: parseTime.toString(),
      }));
    } else if (getCurrentStatus === 1) {
      this.updatePomodoroState((prevState: AppSettings) => ({
        ...prevState,
        percent: calculateCurrentPercent,
        breakTime: parseTime.toString(),
      }));
    } else {
      this.updatePomodoroState((prevState: AppSettings) => ({
        ...prevState,
        percent: calculateCurrentPercent,
        longBreakTime: parseTime.toString(),
      }));
    }
  }
  async resetTimes(
    setSettings: React.Dispatch<React.SetStateAction<AppSettings>>,
    intervalref: React.MutableRefObject<number | null>
  ) {
    try {
      const selectedWorkTime = await localforage.getItem("selectedWorkTime");
      const selectedBreakTime = await localforage.getItem("selectedBreakTime");
      await localforage.setItem("workTime", selectedWorkTime);
      await localforage.setItem("breakTime", selectedBreakTime);
      await localforage.setItem("status", 0);
      setSettings((prevState: AppSettings) => ({
        ...prevState,
        workTime: selectedWorkTime as string,
        breakTime: selectedBreakTime as string,
        percent: 0,
        status: 0,
      }));
      this.stopTimer(intervalref);
    } catch (err) {
      console.log(err);
    }
  }
  async fullReset(
    setSettings: React.Dispatch<React.SetStateAction<AppSettings>>,
    intervalref: React.MutableRefObject<number | null>
  ) {
    try {
      const selectedWorkTime = await localforage.getItem("selectedWorkTime");
      const selectedBreakTime = await localforage.getItem("selectedBreakTime");
      const selectedRoundsValue = await localforage.getItem("selectedRounds");
      await localforage.setItem("workTime", selectedWorkTime);
      await localforage.setItem("breakTime", selectedBreakTime);
      await localforage.setItem("selectedRounds", selectedRoundsValue);
      await localforage.setItem("rounds", selectedRoundsValue);
      await localforage.setItem("status", 0);
      setSettings((prevState: AppSettings) => ({
        ...prevState,
        workTime: selectedWorkTime as string,
        breakTime: selectedBreakTime as string,
        selectedRounds: selectedRoundsValue as number,
        rounds: selectedRoundsValue as number,
        percent: 0,
        status: 0,
      }));
      this.stopTimer(intervalref);
    } catch (err) {
      console.log(err);
    }
  }
  playAudio(): void {
    const audio = new Audio(audioFile);
    audio.play();
  }
}

const pomodoroHandler = new Pomodoro();

const startInterval = (): void => {
  pomodoroHandler.clockHandler();
};

export default pomodoroHandler;
