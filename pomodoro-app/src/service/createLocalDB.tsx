import localforage from "localforage";
import {
  BreakTime,
  LongBreakTime,
  Percent,
  Rounds,
  SelectedBreakTime,
  SelectedLongBreakTime,
  SelectedRounds,
  SelectedWorkTime,
  Status,
  WorkTime,
} from "../models/localDB";

const createLocalDB = async () => {
  const rounds: Rounds = 0;
  const workTime: WorkTime = "1500";
  const breakTime: BreakTime = "300";
  const longBreakTime: LongBreakTime = "1800";
  const status: Status = 0;
  const percent: Percent = 0;
  const selectedWorkTime: SelectedWorkTime = "1500";
  const selectedRounds: SelectedRounds = 4;
  const selectedBreakTime: SelectedBreakTime = "300";
  const selectedLongBreakTime: SelectedLongBreakTime = "1800";
  await localforage.setItem("rounds", rounds);
  await localforage.setItem("workTime", workTime);
  await localforage.setItem("breakTime", breakTime);
  await localforage.setItem("longBreakTime", longBreakTime);
  await localforage.setItem("status", status);
  await localforage.setItem("percent", percent);
  await localforage.setItem("selectedWorkTime", selectedWorkTime);
  await localforage.setItem("selectedRounds", selectedRounds);
  await localforage.setItem("selectedBreakTime", selectedBreakTime);
  await localforage.setItem("selectedLongBreakTime", selectedLongBreakTime);
};

export default createLocalDB;
