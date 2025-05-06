import PageView from "../views/PageView";
import ScreenTimeView from "../views/ScreenTimeView";
import { useDispatch, useSelector } from "react-redux";
import {
  getScreentimeSettings,
  setAlertType,
  setPostSleep,
  setPreSleep,
  setScreentimeSettings,
} from "../model/modules/screentime";
import { useEffect } from "react";
function ScreenTimePresenter() {
  const dispatch = useDispatch();

  const alertType = useSelector((state) => state.screentime.alertType);
  const post_sleep_min = useSelector(
    (state) => state.screentime.post_sleep_min
  );
  const pre_sleep_min = useSelector((state) => state.screentime.pre_sleep_min);

  function handlePreChange(newValue) {
    dispatch(setPreSleep(newValue));
    dispatch(
      setScreentimeSettings({
        post_sleep_min: post_sleep_min,
        pre_sleep_min: newValue,
        alertType: alertType,
      })
    );
  }

  function handlePostChange(newValue) {
    dispatch(setPostSleep(newValue));
    dispatch(
      setScreentimeSettings({
        post_sleep_min: newValue,
        pre_sleep_min: pre_sleep_min,
        alertType: alertType,
      })
    );
  }

  function handleAlertChange(newAlert) {
    dispatch(setAlertType(newAlert));
    dispatch(
      setScreentimeSettings({
        post_sleep_min: post_sleep_min,
        pre_sleep_min: pre_sleep_min,
        alertType: newAlert,
      })
    );
  }

  useEffect(() => {
    dispatch(getScreentimeSettings());
  }, [dispatch]);

  return (
    <PageView title="Screen Time Settings">
      <ScreenTimeView
        beforeSleepLimit={pre_sleep_min}
        afterWakeLimit={post_sleep_min}
        alertType={alertType}
        onBeforeSleepChange={handlePreChange}
        onAfterWakeChange={handlePostChange}
        onAlertTypeChange={handleAlertChange}
      />
    </PageView>
  );
}

export default ScreenTimePresenter;
