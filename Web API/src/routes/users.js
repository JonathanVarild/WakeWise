const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const authService = require("../services/authService");

const validateUserCreation = (req, res, next) => {
  const { username, password, role } = req.body;
  const errors = [];
  if (!username || username.trim().length < 1) errors.push("Username must be at least 1 characters");
  if (!password || password.length < 1) errors.push("Password must be at least 1 characters");
  if (!["user", "admin"].includes(role)) errors.push("Invalid user role");
  if (errors.length > 0) return res.status(400).json({ errors });
  next();
};

const validatePasswordUpdate = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const errors = [];
  if (!oldPassword) errors.push("Current password is required");
  if (!newPassword || newPassword.length < 1) errors.push("New password must be at least 1 characters");
  if (errors.length > 0) return res.status(400).json({ errors });
  next();
};

const validateRoleUpdate = (req, res, next) => {
  if (!["user", "admin"].includes(req.body.newRole)) return res.status(400).json({ errors: ["Invalid role value"] });
  next();
};

router.use(authService.verifyJWT); 


router.route("/users")
  .get(async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      handleError(res, error);
    }
  })
  .post(validateUserCreation, async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      handleError(res, error);
    }
  });

 router.route("/users/:id")
  .delete(async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).end();
    } catch (error) {
      handleError(res, error);
    }
  });


router.put("/role", validateRoleUpdate, async (req, res) => {
  try {
    const updatedUser = await userService.updateUserRole(
      req.params.id,
      req.body.newRole
    );
    res.json(updatedUser);
  } catch (error) {
    handleError(res, error);
  }
});


router.put("/password", validatePasswordUpdate, async (req, res) => {
  try {
    await userService.updateUserPassword(
      req.params.id,
      req.body.oldPassword,
      req.body.newPassword
    );
    res.status(204).end();
  } catch (error) {
    handleError(res, error);
  }
});


function handleError(res, error) {
  const statusMap = {
    "not found": 404,
    "exists": 409,
    "password": 401
  };
  
  const status = Object.keys(statusMap)
    .find(key => error.message.includes(key)) 
    ? statusMap[key] 
    : 400;

  res.status(status).json({ error: error.message });
}

module.exports = router;