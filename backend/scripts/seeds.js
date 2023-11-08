//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/User');
const Item = require('./models/Item');
const Comment = require('./models/Comment');

mongoose.connect('mongodb://localhost:27017/myDatabase', {useNewUrlParser: true, useUnifiedTopology: true});

async function seedDB() {
    for(let i = 0; i < 100; i++) {
        const user = new User({ name: faker.name.findName(), email: faker.internet.email() });
        const item = new Item({ name: faker.commerce.productName(), price: faker.commerce.price() });
        const comment = new Comment({ user: user._id, item: item._id, text: faker.lorem.sentence() });

        await user.save();
        await item.save();
        await comment.save();
    }
    mongoose.connection.close();
}

seedDB();
