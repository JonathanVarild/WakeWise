import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ClockSetupView(props) {
  return (
    <div className="flex-grow">
      <div className="mt-10">
        <div className="mt-10">
          {" "}
          Wi-fi SSID
          <Input type="text" placeholder=""></Input>
        </div>
        <div className="mt-10">
          {" "}
          Wi-fi Password
          <Input type="text" placeholder=""></Input>
        </div>
        <div className="mt-10">
          {" "}
          Clock Name
          <Input
            value={props.clockName}
            onChange={props.onClockNameChange}
            type="text"
            placeholder=""
          ></Input>
        </div>
        <div className="mt-10">
          {" "}
          Username
          <Input
            value={props.username}
            onChange={props.onUserNameChange}
            type="text"
            placeholder=""
          ></Input>
        </div>
        <div className="mt-10">
          {" "}
          Password
          <Input
            value={props.password}
            onChange={props.onPasswordChange}
            type="password"
            placeholder=""
          ></Input>
        </div>
      </div>
      <Button className="mt-10" onClick={props.saveSetup}>
        {" "}
        Finish
      </Button>
    </div>
  );
}

export default ClockSetupView;
