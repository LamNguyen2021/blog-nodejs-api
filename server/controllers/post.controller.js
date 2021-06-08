const posts = require("../models/post.model");

const getPosts = async (req, res) => {
  try {
    const postItems = await posts.find();
    return res.status(200).json(postItems);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const postItem = await posts.findOne(query);
    return res.status(200).json(postItem);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

const getPostPaging = async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 5;
    const page = parseInt(req.query.page) || 1;

    const postItems = await posts
      .find({})
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    const totalPost = await posts.estimatedDocumentCount({});
    const totalPages = Math.ceil(totalPost / pageSize);

    const postPaging = {
      page: page,
      pageSize: pageSize,
      data: postItems,
      totalRecords: totalPost,
      totalPages: totalPages,
    };

    return res.status(200).json(postPaging);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

const createPost = async (req, res) => {
  try {
    const postRequest = req.body;
    if (postRequest) {
      const newPost = new posts({
        title: postRequest.title,
        content: postRequest.content,
        excerpt: postRequest.excerpt,
        lastModified: new Date(),
        publishDate: new Date(),
        urlImage: postRequest.urlImage,
      });
      await newPost.save(); // tại sao lại await ở đây
      return res.status(201).send(newPost);
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const existingPost = await posts.findOne({ _id: req.params.id });
    if (!existingPost)
      return res.status(404).send({ error: "Post doesn't exist!" });

    const postRequest = req.body;

    if (postRequest) {
      existingPost.title = postRequest.title
        ? postRequest.title
        : existingPost.title;
      existingPost.content = postRequest.content
        ? postRequest.content
        : existingPost.content;
      existingPost.excerpt = postRequest.excerpt
        ? postRequest.excerpt
        : existingPost.excerpt;
      existingPost.publishDate = postRequest.publishDate
        ? postRequest.publishDate
        : existingPost.publishDate; // này có không nên cho sửa, trong form front end không có trường này, mắc công xử lý
      existingPost.lastModified = new Date();
      existingPost.urlImage = postRequest.urlImage; // tại sao không cho cập nhật hình, rồi cập nhật có dc không

      await existingPost.save();
      return res.send(existingPost);
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const existingPost = await posts.findOne({ _id: req.params.id });
    if (!existingPost)
      return res.status(404).send({ error: "Post doesn't exist!" });

    await posts.deleteOne({ _id: req.params.id });
    return res.status(204).send();
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving posts.",
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  getPostPaging,
  createPost,
  updatePost,
  deletePost,
};
