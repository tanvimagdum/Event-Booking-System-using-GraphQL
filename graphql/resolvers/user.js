const bcrypt = require("bcryptjs");
const User =  require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: args => {
        return User
        .findOne({ email: args.userInput.email })
        .then(user => {
            if(user) {
                throw new Error ("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12);
        })
        .then(hashedPassword => {
            const user = new User ({
                email: args.userInput.email,
                password: hashedPassword
            });
            return user.save();
        })
        .then(result => {
            return { ...result._doc, password: null };
        })
        .catch(err => {
            throw err;
        }); 
    },
    login: ({email, password}) => {
        return User.findOne({email: email})
        .then(user => {
            if (!user) {
                throw new Error("User does not exist.");
            }
            return bcrypt.compare(password, user.password)
            .then((isEqual) => {
                if (!isEqual) {
                    throw new Error("Password incorrect.");
                }
                const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {expiresIn: '1h'})
                return {
                    userId: user.id,
                    token: token,
                    tokenExpiration: 1
                };
            });
        })
        .catch(err => {
            throw err;
        }); 
    }
}