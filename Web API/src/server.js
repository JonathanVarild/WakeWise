// Setup our app.
const app = require("./app.js");

// API server configuration.
const PORT = 3000;

// Start the server.
app.listen(PORT, () => {
  console.log(`WakeWise Web API is running on port ${PORT}`);
});