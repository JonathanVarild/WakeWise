import { useState } from "react";
import UserSettingsView from "../views/UserSettingsView";
import PageView from "../views/PageView";
import { useDispatch, useSelector } from "react-redux";
import { 
  setUsername, 
  setUserPassword, 
  setIsAdmin, 
  setUserSettings 
} from "../model/modules/user";

function UserSettingsPresenter() {
  const dispatch = useDispatch();
  const [saveStatus, setSaveStatus] = useState("");
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  

  const { 
    username = "", 
    userPassword = "", 
    isAdmin = false 
  } = useSelector((state) => state.user || {});

  function saveSettingsACB() {
    if (!oldPassword.trim() || !newPassword.trim()) {
      setSaveStatus('error-missing');
      return;
    }
    try {
      dispatch(setUserSettings({ username, userPassword, isAdmin }));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      setSaveStatus('error');
    }
  }

  return (
    <PageView title="">
      {saveStatus === 'success' && (
        <div className="text-green-500 mb-4">Saved successfully!</div>
      )}
      {saveStatus === 'error' && (
        <div className="text-red-500 mb-4">Save failed</div>
      )}
      
      <UserSettingsView
        username={username}
        oldPassword={oldPassword}
        newPassword={newPassword}
        isAdmin={isAdmin}
        onUsernameChange={(e) => dispatch(setUsername(e.target.value))}
        onOldPasswordChange={(e) => setOldPassword(e.target.value)}
        onNewPasswordChange={(e) => setNewPassword(e.target.value)}
        onIsAdminChange={(checked) => dispatch(setIsAdmin(checked))} 
        saveSettings={saveSettingsACB}
      />
    </PageView>
  );
}

export default UserSettingsPresenter;