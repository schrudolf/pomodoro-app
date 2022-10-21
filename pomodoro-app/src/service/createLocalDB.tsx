import React from "react";
import localforage from "localforage";

type Rounds = number;
type WorkTime = string;
type SelectedWorkTime = string;
type BreakTime = number;
type LongBreakTime = number;
type Status = number;
type Percent = number;

const createLocalDB = ():void => {
  const rounds: Rounds = 4;
  const workTime: WorkTime = "2500";
  const selectedWorkTime: SelectedWorkTime = "2500";
  const breakTime: BreakTime = 5;
  const longBreakTime: LongBreakTime = 10;
  const status: Status = 0;
  const percent: Percent = 0;
  localforage.setItem("rounds", rounds, (err) => {
    if (err) throw err;
  });
  localforage.setItem("workTime", workTime, (err) => {
    if (err) throw err;
  });
  localforage.setItem("selectedWorkTime", selectedWorkTime, (err) => {
    if (err) throw err;
  });
  localforage.setItem("breakTime", breakTime, (err) => {
    if (err) throw err;
  });
  localforage.setItem("longBreakTime", longBreakTime, (err) => {
    if (err) throw err;
  });
  localforage.setItem("status", status, (err) => {
    if (err) throw err;
  });
  localforage.setItem("percent", percent, (err) => {
    if (err) throw err;
  });
};

export default createLocalDB;
