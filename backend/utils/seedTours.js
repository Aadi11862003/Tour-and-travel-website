import { connectDB, sequelize } from '../config/db.js';
import Tour from '../models/tourModel.js';
import dotenv from 'dotenv';

dotenv.config();

const tours = [
  {
    title: "Magnificent Rajasthan Heritage Tour",
    city: "Jaipur",
    address: "City Palace, Jaipur, Rajasthan",
    distance: 1500,
    price: 25000,
    maxGroupSize: 15,
    desc: "Experience the royal heritage of Rajasthan with visits to majestic palaces, historic forts, and colorful markets. Tour includes visits to Jaipur's City Palace, Amber Fort, Hawa Mahal, and traditional Rajasthani cultural performances. Enjoy luxury accommodations and authentic Rajasthani cuisine.",
    photo: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    title: "Kashmir Paradise Tour",
    city: "Srinagar",
    address: "Dal Lake, Srinagar, Kashmir",
    distance: 2500,
    price: 35000,
    maxGroupSize: 10,
    desc: "Discover the paradise on Earth with this comprehensive Kashmir tour. Stay in luxury houseboats on Dal Lake, visit the beautiful Mughal Gardens, take a shikara ride, and explore the serene Pahalgam and Gulmarg. Experience local Kashmiri hospitality and cuisine.",
    photo: "https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    title: "Sacred Ayodhya Pilgrimage",
    city: "Ayodhya",
    address: "Ram Janmabhoomi, Ayodhya, Uttar Pradesh",
    distance: 800,
    price: 15000,
    maxGroupSize: 20,
    desc: "Embark on a spiritual journey to the holy city of Ayodhya. Visit the magnificent Ram Mandir, explore ancient temples, take a holy dip in the Saryu River, and learn about the rich mythology and history of this sacred city.",
    photo: "https://images.unsplash.com/photo-1707295716397-f116ed606cb5?q=80&w=1000&auto=format&fit=crop",
    featured: true
  },
  {
    title: "Mystical Varanasi Experience",
    city: "Varanasi",
    address: "Dashashwamedh Ghat, Varanasi, Uttar Pradesh",
    distance: 1200,
    price: 20000,
    maxGroupSize: 12,
    desc: "Immerse yourself in the spiritual heart of India. Witness the mesmerizing Ganga Aarti, explore ancient temples, take boat rides on the holy Ganges, visit the famous Banaras Hindu University, and experience the unique culture of the world's oldest living city.",
    photo: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop",
    featured: false
  },
  {
    title: "Golden Kerala Backwaters Tour",
    city: "Alleppey",
    address: "Alleppey Backwaters, Kerala",
    distance: 2000,
    price: 30000,
    maxGroupSize: 8,
    desc: "Experience the tranquil backwaters of Kerala in a traditional houseboat. Enjoy authentic Kerala cuisine, witness local village life, visit spice plantations, and relax with Ayurvedic treatments. Perfect blend of nature, culture, and relaxation.",
    photo: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1000&auto=format&fit=crop",
    featured: true
  }
];

const seedTours = async () => {
  try {
    await connectDB();
    
    // Clear existing tours
    await Tour.destroy({ where: {} });
    console.log('Existing tours cleared');

    // Add new tours
    await Tour.bulkCreate(tours);
    console.log('Tours added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding tours:', error);
    process.exit(1);
  }
};

seedTours(); 