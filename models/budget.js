const mongoose = require('mongoose');

const validateColorCode = (value) => /^#([A-Fa-f0-9]{6})$/.test(value);

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        validate: {
            validator: validateColorCode,
            message: 'Color code must be a valid hexadecimal color code (e.g., "#ED4523").'
        },
        required: true,
        trim: true,
        uppercase: true,
    }
}, {
    collection: 'budget'
});

module.exports = mongoose.model('budget', budgetSchema);
