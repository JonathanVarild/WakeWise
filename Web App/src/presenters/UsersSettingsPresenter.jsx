// UsersSettingsPresenter.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchUsers, 
  createUser, 
  updateUserRole, 
  deleteUser,
  updatePassword 
} from "../model/modules/users";
import { changeSubTab } from '../model/modules/navigation';
import UsersSettingsView from "../views/UsersSettingsView";

export default function UsersSettingsPresenter() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState({ old: "", new: "", confirm: "" });
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "user" });
  const [passwordErrors, setPasswordErrors] = useState([]);
  
  const { 
    list: users = [], 
    status = 'idle', 
    operationStatus 
  } = useSelector(state => state.interface?.users || {});
  const currentUser = useSelector(state => state.auth?.authenticatedAs);

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
  }, [dispatch, status]);

  const validatePassword = () => {
    const errors = [];
    if (password.new !== password.confirm) errors.push("Passwords must match");
    if (password.new.length < 3) errors.push("Password must be at least 3 characters");
    return errors;
  };

  const handlePasswordUpdate = async () => {
    const errors = validatePassword();
    if (errors.length > 0) return setPasswordErrors(errors);
    
    try {
      await dispatch(updatePassword({
        userId: currentUser.id,
        oldPassword: password.old,
        newPassword: password.new
      })).unwrap();
      setPassword({ old: "", new: "", confirm: "" });
      setPasswordErrors([]);
    } catch (error) {
      setPasswordErrors([error.message]);
    }
  };

  const handleCreateUser = async () => {
    try {
      await dispatch(createUser(newUser)).unwrap();
      setNewUser({ username: "", password: "", role: "user" });
    } catch (error) {
      alert(`User creation failed: ${error.message}`);
    }
  };

  const handleGlobalSave = () => {
   dispatch(changeSubTab(null));
  };

  return (
    <UsersSettingsView
      currentUser={currentUser}
      users={users}
      password={password}
      newUser={newUser}
      loading={status === "loading"}
      passwordErrors={passwordErrors}
      onPasswordChange={(field, value) => setPassword(prev => ({ ...prev, [field]: value }))}
      onNewUserChange={(field, value) => setNewUser(prev => ({ ...prev, [field]: value }))}
      onCreateUser={handleCreateUser}
      onPasswordUpdate={handlePasswordUpdate}
      onRoleUpdate={(userId, role) => dispatch(updateUserRole({ userId, newRole: role }))}
      onDeleteUser={(userId) => dispatch(deleteUser(userId))}
      onGlobalSave={handleGlobalSave}
    />
  );
}