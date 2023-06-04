const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const {
        typeOfUser,
        name,
        email,
        password,
        checkPassword,
        phone,
        birthday,
        wilaya,
        daira,
        baladia,
        sport,
        gender
        } = req.body;

        // Verify if there is errors
        let errors = [];
        if (name.length < 6) {
            errors.push('nameError');
        }
        if (password.length < 8) {
            errors.push('passwordError');
        }
        if (password !== checkPassword) {
            errors.push('checkPasswordError');
        }
        if (phone.length !== 10) {
            errors.push('phoneError');
        }
        if (!birthday) {
            errors.push('birthdayError');
        }
        if (wilaya === "إختر ولاية" || wilaya === '') {
            errors.push('wilayaError')
        } 
        if (daira === "إختر دائرة" || daira === '') {
            errors.push('dairaError')
        }
        if (baladia === "إختر بلدية" || baladia === '' ) {
            errors.push('baladiaError')
        }
        if (!sport) {
            errors.push('sportError')
        }
        if (!gender) {
            errors.push('genderError')
        }

        if (errors.length) {
            return res.json({errors : errors});
        }

        const userExists = await User.findOne({ phone });
        if (userExists) {
            return res.json({
                err: 'رقم الهاتف مستخدم مسبقا'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            birthday,
            wilaya,
            daira,
            baladia,
            sport,
            gender,
            typeOfUser
        });

        const savedUser = await newUser.save();
        // Sign a JWT and send it in the response
        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.status(201).json({
        message: 'تم إضافة المستخدم بنجاح',
        user: savedUser,
        token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ error: 'مستخدم غير موجود' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'كلمة السر خاطئة' });
        }

        // Sign a JWT and send it in the response
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.status(200).json({ message: 'Login successful', token, userId : user._id });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.getUser = async (req, res) => {
    try {
    const { id } = req.params;
    const userFound = await User.findById({ _id : id });

    res.status(200).json({ userFound });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
    }
};

exports.getResultSearch = async (req, res) => {
    try {
    const { wilaya, daira, baladia } = req.body;
    const users = await User.find({ wilaya, daira, baladia });

    res.status(200).json({ users });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
    }
};

exports.follow = async (req, res) => {
    try {
        const { userId, adminId } = req.params;

        // Update the following array of User A
        const admin = await User.findByIdAndUpdate(adminId,{ $addToSet: { following: userId } });
    
        // Update the followers array of User B
        const user = await User.findByIdAndUpdate(userId
            ,{ $push: { followers: adminId }});

        res.status(200).json({ message: 'تمت متابعته بنجاح',user,admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error following user' });
    }
};

exports.unfollow = async (req, res) => {
    try {
        const { userId, adminId } = req.params;
        const admin = await User.findByIdAndUpdate( adminId
            ,{ $pull: { following: userId }},
            { new: true });
        const user = await User.findByIdAndUpdate( userId
            ,{ $pull: { followers: adminId }},
            { new: true });
        res.status(200).json({ message: 'تم الغاء المتابعة بنجاح',user,admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error remove following user' });
    }
};

exports.newNotify = async (req,res) => {
    const { userId } = req.params;
    const { id, message } = req.body;
    // Update the followers array of User B
    const user = await User.findByIdAndUpdate( userId
        ,{$push: { notifications: { id, message } },
        $inc: { nombreOfNotifications: 1 } 
        }
    );
    res.status(200).json({ user });
}

exports.initializeNotifyNumbers = async (req, res) => {

    try {
        const { userId} = req.params;
        const user = await User.findByIdAndUpdate(userId, { nombreOfNotifications: 0 } );

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error update user nombreOfNotifications ' });
    }
};

// SETTINGS

exports.editUser= async(req,res ) => {
    try {
        const update = req.body
        const { id } = req.params;
        const userToUpdate = await User.findByIdAndUpdate({ _id : id }, update);
        res.json({userToUpdate})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.editPassword= async (req,res) => {
    try {
        const {curpass, password} = req.body;

        const user = await User.findById(req.params.id);
        console.log({password})
        console.log('this is the curpass')
        console.log({curpass})
        
            // Check if the old password matches the one stored in the database
        const isPasswordMatch = await bcrypt.compare(curpass, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid old password' });
        }


    // Generate a new salt and hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log({hashedPassword})
    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'An error occurred' });
}
};
