import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
      country: String
    },
    paymentMethod: { type: String, default: 'COD' },
    itemsPrice: Number,
    shippingPrice: Number,
    taxPrice: Number,
    totalPrice: Number,
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered'],
      default: 'Pending'
    },
    isPaid: { type: Boolean, default: false },
    paidAt: Date
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
