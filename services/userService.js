const { readDataAsync } = require("../utils/fileHelperAsync");

const getUsers = async () => {
  return await readDataAsync();
};

const getUserById = async (id) => {
  const users = await getUsers();
  return users.find((user) => user.id === Number(id));
};

module.exports = { getUsers, getUserById };
