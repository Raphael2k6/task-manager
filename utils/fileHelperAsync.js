const fs = require("fs/promises");
const filePath = require("./filePath");

const writeDataAsync = (data) => {
  return fs.writeFile(filePath, JSON.stringify(data));
};

const readDataAsync = async () => {
  try {
    const rawJson = await fs.readFile(filePath, "utf-8");
    return rawJson ? JSON.parse(rawJson) : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(filePath, "[]", "utf-8");
      return [];
    }
    throw error; // Other errors should be thrown
  }
};

module.exports = { writeDataAsync, readDataAsync };
