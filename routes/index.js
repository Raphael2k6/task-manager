const userController = require("../controllers/userController");
// const postController = require("../controllers/postControllers");
const response = require("../utils/response");
const validateUserData = require("../validation/userValidation");

const routes = {
  "/": {
    GET: (_req, res) => {
      response(res, { data: { message: "running nodejs api" } });
    },
  },
  "/users": {
    GET: userController.getUsers,
    POST: (req, res) => {
      validateUserData(req, res, userController.createUser);
    },
  },
  "/user/:id": {
    GET: userController.getUserById,
    DELETE: userController.deleteUserById,
    PUT: (req, res) => {
      validateUserData(req, res, userController.updateUser);
    },
  },
  //   "/post": {
  //     GET: postController.getPost,
  //     POST: (req, res) => {
  //       validatePostdata(req, res, postcontroller.createPost);
  //     },
  //   },
  //   "/post/:id": {
  //     GET: postController.getUserById,
  //     DELETE: postController.deleteUserById,
  //     PUT: (req, res) => {
  //       validatePostData(req, res, postController.updatePost);
  //     },
  //   },
  notFound: (_req, res) => {
    response(res, {
      status: 404,
      data: {
        message: "Resource not found",
      },
    });
  },
};

module.exports = routes;
