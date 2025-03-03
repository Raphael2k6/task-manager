const userService = require("../services/userService");
const response = require("../utils/response");
const { writeDataAsync } = require("../utils/fileHelperAsync");

// create new user
const createUser = async (req, res) => {
  try {
    let body = req.body;
    const users = await userService.getUsers();
    const foundUser = users.find((user) => user.name === body.name);

    if (foundUser) {
      return response(res, {
        data: { message: `'${body.name} already exists!` },
        status: 409,
      });
    }

    body.id = users.length + 1;
    users.push(body);
    await writeDataAsync(users);

    response(res, { data: users, status: 201 });
  } catch (error) {
    response(res, { status: 400, data: { message: error.message } });
  }
};

//get users
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    response(res, { data: users });
  } catch (error) {
    response(res, { status: 400, data: { message: error.message } });
  }
};

//get user by user id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    const data = user ? user : { message: `user not found for id '${id}` };
    response(res, { data });
  } catch (error) {
    response(res, { status: 400, data: { message: error.message } });
  }
};

//update user by user id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let users = await userService.getUsers();

    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      return response(res, {
        data: { message: "user not found", status: 400 },
      });
    }

    users = users.map((user) => {
      if (user.id === Number(id)) {
        return {
          ...user,
          ...req.body,
        };
      }
      return user;
    });

    await writeDataAsync(users);

    response(res, {
      data: users,
      status: 201,
      message: "user successfully updated",
    });
  } catch (error) {
    response(res, { status: 400, data: { message: error.message } });
  }
};

//delete user by id
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    let users = await userService.getUsers();

    const foundUser = users.find((user) => user.id === +id);

    if (!foundUser) {
      return response(res, {
        status: 400,
        data: { message: `User not found` },
      });
    }

    users = users.filter((user) => user.id !== id);

    await writeDataAsync(users);
    response(res, { status: 204 });
  } catch (error) {
    response(res, { status: 400, data: { message: error.message } });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUserById,
};
