const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { firestore } = require('../firestore');

const usersCollection = firestore.collection('users');
const jwtSecret = process.env.JWT_SECRET;

const register = async (name, email, password) => {
    const userDoc = await usersCollection.where('email', '==', email).get();

    if (userDoc.docs[0].exists) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await usersCollection.add({ 
        name, 
        email, 
        password: hashedPassword 
    });

    return { message: 'User registered successfully' };
};

const login = async (email, password) => {
    const userDoc = await usersCollection.where('email', '==', email).get();

    if (!userDoc.docs[0].exists) {
        return { error: true, message: 'Invalid email or password', loginResult: null };
    }

    const user = userDoc.docs[0].data();
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return { error: true, message: 'Invalid email or password', loginResult: null };
    }

    const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '7d' });
    const loginResult = {
        userId: userDoc.docs[0].id,
        name: user.name,
        email: user.email,
        token: token
    };
    
    return { error: false, message: 'success', loginResult };
};

module.exports = { register, login };
