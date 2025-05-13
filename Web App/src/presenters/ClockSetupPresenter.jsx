import ClockSetupView from "../views/ClockSetupView";
import { useDispatch } from "react-redux";
import PageView from "../views/PageView";
import {
  setClockName,
  setUsername,
  setUserPassword,
} from "../model/modules/clock";
import { useSelector } from "react-redux";
import { TAB_ALARM, changeTab } from "../model/modules/navigation";

function ClockSetupPresenter() {
  const dispatch = useDispatch();

  const clockName = useSelector((state) => state.clock.clockName);
  const username = useSelector((state) => state.clock.username);
  const userPassword = useSelector((state) => state.clock.userPassword);

  function saveSetupACB() {
    dispatch(changeTab(TAB_ALARM));
    console.log("ClockName:", clockName);
    console.log("User:", username);
    console.log("Password:", userPassword);
  }

  function handleClockNameChange(e) {
    dispatch(setClockName(e.target.value));
  }

  function handleUserNameChange(e) {
    dispatch(setUsername(e.target.value));
  }

  function handlePasswordChange(e) {
    dispatch(setUserPassword(e.target.value));
  }

  return (
    <PageView title="Clock Setup">
      <ClockSetupView
        onClockNameChange={handleClockNameChange}
        onUserNameChange={handleUserNameChange}
        onPasswordChange={handlePasswordChange}
        password={userPassword}
        clockName={clockName}
        username={username}
        saveSetup={saveSetupACB}
      />
    </PageView>
  );
}

export default ClockSetupPresenter;
