export const addNotification = (
  message
) => {

  const notifications =
    JSON.parse(
      localStorage.getItem(
        "notifications"
      )
    ) || [];

  notifications.push({
    id: Date.now(),
    message
  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );
};