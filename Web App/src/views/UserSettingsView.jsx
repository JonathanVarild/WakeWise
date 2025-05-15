import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function UserSettingsView(props) {
  return (
    <div className="flex-grow">
      <div className="mt-10 space-y-6">
        <div>
          current password
          <Input
            type="password"
            value={props.oldPassword}
            onChange={props.onOldPasswordChange}
          />
        </div>
        <div>
          new password
          <Input
            type="password"
            value={props.newPassword}
            onChange={props.onNewPasswordChange}
          />
        </div>

<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    className="h-4 w-4 accent-primary cursor-pointer" 
    checked={props.isAdmin}
    onChange={(e) => {
      props.onIsAdminChange(e.target.checked);
    }}
    id="admin-checkbox"
  />
  <label
    htmlFor="admin-checkbox"
    className="cursor-pointer select-none"
  >
    Admin
  </label>
</div>
      </div>
      <Button className="mt-10" onClick={props.saveSettings}>
        Save
      </Button>
    </div>
  );
}

export default UserSettingsView;