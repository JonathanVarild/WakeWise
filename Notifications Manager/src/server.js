// Setup our app.
const app = require("./app.js");

// API server configuration.
const PORT = 3001;

// Start the server.
app.listen(PORT, () => {
  console.log(`WakeWise Notifications Manager is running on port ${PORT}`);
});