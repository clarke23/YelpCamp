const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'
// const dbUrl = 'mongodb://localhost:27017/yelp-camp'
// const dbUrl = process.env.DB_URL 
mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connection')
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            owner: "62136836d6984a5e850c4933",
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat beatae voluptate, illum odio illo suscipit quam nostrum magnam sit voluptatibus dolorem, quaerat debitis nam commodi laborum recusandae quisquam totam. Similique!',
            price,
            geometry: { type: "Point", coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
            ] 
        },
            images: [
                {
                  url: 'https://res.cloudinary.com/dfkmzaapm/image/upload/v1645783452/YelpCamp/eef6onm9xllgxo1dshsr.jpg',
                  filename: 'YelpCamp/kxjdx2wwzmugzuyo9jcc',
                 
                },
                {
                  url: 'https://res.cloudinary.com/dfkmzaapm/image/upload/v1645696239/YelpCamp/enn5o46rb2bcqmkpnjm8.jpg',
                  filename: 'YelpCamp/enn5o46rb2bcqmkpnjm8',
                  
                }
              ]
        })
        await camp.save()
        //    res.send(camp)
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})