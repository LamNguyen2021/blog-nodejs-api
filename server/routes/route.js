const express = require("express");

const router = express.Router();

const postController = require("../controllers/post.controller");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifytoken.middleware");

/* post */
router.get("/api/post", postController.getPosts);
router.get("/api/post/paging", postController.getPostPaging);
router.get("/api/post/:id", postController.getPostById);
router.post("/api/post", verifyToken, postController.createPost);
router.put("/api/post/:id", verifyToken, postController.updatePost);
router.delete("/api/post/:id", verifyToken, postController.deletePost);

/* user */
router.post("/api/user/login", userController.login);

module.exports = router;
