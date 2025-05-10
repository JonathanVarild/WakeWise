import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsView from "../views/NotificationsView";
import { getPreferences, updatePreferences } from "../model/modules/notifications";

const NotificationsPresenter = () => {
  const dispatch = useDispatch();
  const { preferences, status } = useSelector(state => state.notifications);

  useEffect(() => {
    dispatch(getPreferences());
  }, [dispatch]);

  const handleToggle = (prefType) => {
    const updated = { ...preferences, [prefType]: !preferences[prefType] };
    dispatch(updatePreferences(updated));
  };

  return (
    <NotificationsView
      preferences={preferences}
      loading={status === "loading"}
      onToggle={handleToggle}
    />
  );
};

export default NotificationsPresenter;