import { DataTypes } from 'sequelize';
import { sequelize, baseModel } from './baseModel.js';
import User from './userModel.js';
import Tour from './tourModel.js';

const Booking = sequelize.define('Booking', {
  ...baseModel,
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guestSize: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bookAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
    defaultValue: 'pending'
  }
});

// Set up relationships
Booking.belongsTo(User);
Booking.belongsTo(Tour);
User.hasMany(Booking);
Tour.hasMany(Booking);

export default Booking; 