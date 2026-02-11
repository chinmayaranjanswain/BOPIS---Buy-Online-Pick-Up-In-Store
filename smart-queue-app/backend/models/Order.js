const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    customerEmail: {
        type: String,
        required: true,
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    isDelivered: { // In your case, this means "Picked Up"
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;