// Setup our app.
const app = require("./app.js");

// API server configuration.
const PORT = 3002;

// Start the server.
app.listen(PORT, () => {
  console.log(`WakeWise Object Storage is running on port ${PORT}`);
});