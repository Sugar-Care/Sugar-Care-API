require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { firestore } = require('./firestore');

const usersCollection = firestore.collection('users');

const register = async (name, email, password) => {
    const userDoc = await usersCollection.doc(email).get();
    if (userDoc.exists) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.doc(email).set({ name, email, password: hashedPassword });

    return { message: 'User registered successfully' };
};

const jwtSecret = process.env.JWT_SECRET;

const login = async (email, password) => {
    const userDoc = await usersCollection.doc(email).get();
    if (!userDoc.exists) {
        return { error: true, message: 'Invalid email or password', loginResult: null };
    }

    const user = userDoc.data();
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return { error: true, message: 'Invalid email or password', loginResult: null };
    }

    const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '7d' });
    const loginResult = {
        userId: user.email,
        name: user.name,
        email: user.email,
        token: token
    };
    return { error: false, message: 'success', loginResult };
};

module.exports = { register, login };
