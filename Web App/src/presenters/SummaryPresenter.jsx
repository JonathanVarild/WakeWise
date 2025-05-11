import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SummaryView } from "../views/SummaryView";
import { getTemp } from "../model/modules/summary";
import { getAvailableUsers } from "../model/modules/authentication";
import { getAccuracy, getScore } from "../model/modules/statistics";
import { setUserNotes } from "../model/modules/summary";

export function SummaryPresenter(props) {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.authentication.authenticatedAs);
  const temp = useSelector((state) => state.summary.temp);
  const accuracy = useSelector((state) => state.statistics.accuracy);
  const score = useSelector((state) => state.statistics.score);

  const [durationInHours, setDurationInHours] = useState([]);
  const [todaysHours, setTodaysHours] = useState();
  const [todaysScore, setTodaysScore] = useState();

  useEffect(() => {
    dispatch(getAvailableUsers());
    dispatch(getTemp());
    dispatch(getAccuracy());
    dispatch(getScore());
  }, [dispatch]);

  useEffect(() => {
    console.log("Accuracy updated:", accuracy);
    if (Array.isArray(accuracy) && accuracy.length > 0) {
      console.log("Temp has data, calling getSleepingHours...");
      getSleepingHours();
    } else return;
  }, [accuracy]);

  useEffect(() => {
    console.log("Score updated:", score);
    if (Array.isArray(score) && score.length > 0) {
      console.log("Score has data, calling getTodaysScore...");
      getTodaysScore();
    } else return;
  }, [score]);

  function getTodaysScore() {
    if (!score || !Array.isArray(score)) {
      console.log("Accuracy is not ready");
      return;
    }

    const length = score.length;

    setTodaysScore(score[length - 1].score);
    console.log("TODAYS SCORE: ", todaysScore);
  }

  function getSleepingHours() {
    if (!accuracy || !Array.isArray(accuracy)) {
      console.log("Accuracy is not ready");
      return;
    }

    const durations = accuracy.map((item) => {
      const start = new Date(item.planned_start);
      const end = new Date(item.planned_end);

      const durationInMilliseconds = end - start;
      const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

      console.log(
        `Duration of sleep for ID ${item.id}:`,
        durationInHours,
        "hours"
      );
      return durationInHours;
    });

    setDurationInHours(durations);
    console.log(durations);
    const length = durations.length;
    setTodaysHours(durations[length - 1]);
    console.log("TODAY: ", todaysHours);
  }

  const setUserNotesACB = (user_notes) => {
    dispatch(setUserNotes({user_note: user_notes}));
  }

  return (
    <SummaryView
    name={username}
    temp={temp}
    durations={durationInHours}
    todaysHours={todaysHours}
    todaysScore={todaysScore}
    setUserNotes={setUserNotesACB} 
  />
  );
}
