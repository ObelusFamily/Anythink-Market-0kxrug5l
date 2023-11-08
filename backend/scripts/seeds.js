//TODO: seeds script should come here, so we'll be able to put some data in our local env

const mongoose = require('mongoose');
const faker = require('faker');

const User = mongoose.model('User', new mongoose.Schema({ name: String, email: String }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: String, price: Number }));
const Comment = mongoose.model('Comment', new mongoose.Schema({ user: String, product: String, text: String }));

async function seedDB() {
    for(let i = 0; i < 100; i++) {
        const user = new User({ name: faker.name.findName(), email: faker.internet.email() });
        const product = new Product({ name: faker.commerce.productName(), price: faker.commerce.price() });
        const comment = new Comment({ user: user.name, product: product.name, text: faker.lorem.sentence() });

        await user.save();
        await product.save();
        await comment.save();
    }
    mongoose.connection.close();
}

seedDB();
