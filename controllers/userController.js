const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User, users } = require('../models/userModel');
const { validateRegistration, validateLogin } = require('../helpers/validation');



const registerUser = async (req, res) => {
    try {
     const errors = validateRegistration(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { id: users.length + 1, email, password: hashedPassword, role };
    users.push(newUser);

    // Send confirmation email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mehul15g@gmail.com',
            pass: 'tlkj guik znfe rvfr'
        }
    });

    const mailOptions = {
        from: 'mehul15g@@gmail.com',
        to: email,
        subject: 'Registration Successful',
        text: 'Welcome! You have successfully registered.'
    };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const errors = validateLogin(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message:'User logged in', token});
   } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
   }
};

module.exports = {
    registerUser,
    loginUser
};
