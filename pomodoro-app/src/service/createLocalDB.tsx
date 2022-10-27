import React from "react";
import localforage from "localforage";

type Rounds = number;
type WorkTime = string;
type BreakTime = number;
type LongBreakTime = number;
type Status = number;
type Percent = number;
type SelectedWorkTime = string;
type SelectedRounds = number;

const createLocalDB = async () => {
  const rounds: Rounds = 4;
  const workTime: WorkTime = "2500";
  const breakTime: BreakTime = 5;
  const longBreakTime: LongBreakTime = 10;
  const status: Status = 0;
  const percent: Percent = 0;
  const selectedWorkTime: SelectedWorkTime = "1500";
  const selectedRounds: SelectedRounds = 0;
  await localforage.setItem("rounds", rounds)
  await localforage.setItem("workTime", workTime)
  await localforage.setItem("breakTime", breakTime)
  await localforage.setItem("longBreakTime", longBreakTime)
  await localforage.setItem("status", status)
  await localforage.setItem("percent", percent)
  await localforage.setItem("selectedWorkTime", selectedWorkTime)
  await localforage.setItem("selectedRounds", selectedRounds)
};

export default createLocalDB;
