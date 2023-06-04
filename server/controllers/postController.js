const {Post} = require('../models/Post') 
const {User} = require('../models/User') 

exports.addPost = async (req,res) => {
    try {
        const { description } = req.body;
        const { userId } = req.params;
        const image =req.file ? req.file.filename : '';
        // console.log(req.file);
        const newPost = new Post({
            description,
            userId,
            image
        });
        const savedPost = await newPost.save();
        res.status(201).json({
            message: 'Post added successfully',
            post: savedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
    
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getPostsById = async (req,res) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({userId : id}).sort({ createdAt: -1 });
    
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getPostById = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById({ id });
    
        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getAdminPost = async (req,res) => {
    try {
        const admin = await User.findOne({ typeOfUser : 'admin'});

        const post = await Post.findOne({ userId : admin._id});
    
        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.removePost = async (req,res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndRemove(postId);

        res.status(200).json({ message : 'تم حذف المنشور',post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.changeProfile = async (req, res) => {
    const userId = req.params.id;
    const image =req.file ? req.file.filename : '';    
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { photoProfile : image },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.addJam = async (req, res) => {
    try {
    const { postId, adminId } = req.params;
    const post = await Post.findByIdAndUpdate( postId
        ,{ $push: { likes: adminId }});
    res.status(200).json({ post});
    } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
};

exports.incJam = async (req, res) => {
    try {
    const { postId, adminId } = req.params;
    const user = await Post.findByIdAndUpdate( postId
        ,{ $pull: { likes: adminId } },
        { new: true });
    res.status(200).json({ user});
    } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, comment, createdDate } = req.body;
        const post = await Post.findByIdAndUpdate( postId
            ,{ $push: { comments: { userId, comment, createdDate } }});
        res.status(200).json({ post , message: 'تم إضافة التعليق'});
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;

    try {
    const post = await Post.findById(postId);
    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
    post.comments.splice(commentIndex, 1);
    await post.save();
    return res.status(200).json({ message: 'تم حذف التعليق' });
    } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
    }
};