const Order = require('../models/Order')
const User = require('../models/user');

const getOrders = async (req, res) => {
  try {
    const data = await Order.find()
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { _id } = req?.decoded
    const data = await Order.find({ userId:_id }).populate('products.item.product_id') // Populate all fields in products
    .populate('address'); // Populate all fields in address
    res.status(200).json({ data })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
};

const getOrderById = async (req, res) => {
  try {
      const orderId = req.params.orderId;
      console.log(orderId);
      const data = await Order.findById(orderId)
          .populate('products.item.product_id')
          .populate('address');
     // console.log(data);
      res.status(200).json({ data });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error?.message ?? 'Something went wrong' });
  }
};


const createOrder = async (req, res) => {
  const { _id } = req?.decoded

  const {  payment_mode, amount, address, products } = req?.body
  try {
    const data = await Order.create({ userId:_id, payment_mode, amount, address, products })

// Remove cart items from the user after order creation
const user = await User.findById(_id);
user.cart.item = []; // Clear the cart items
user.cart.totalPrice = 0; // Reset total price to zero
await user.save(); // Save the user with cleared cart

    res.status(201).json({ data, message: 'Order placed successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

const updateOrder = async (req, res) => {
  const { _id, status } = req?.body
  try {
    const data = await Order.updateOne({ _id },
      { $set: { status }})
    res.status(201).json({ data, message: 'Order updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
  }
}

module.exports = {
    getOrders,
    getUserOrders,
    createOrder,
    updateOrder,
    getOrderById,
  }