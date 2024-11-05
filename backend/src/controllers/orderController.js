const Order = require("../models/OrderModel");
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { customerId, customerName, address, contact, items, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      customerId,
      customerName,
      address,
      contact,
      items,
      totalAmount,
    });

    await newOrder.save();

    for (const item of items) {
        await Product.updateOne(
          { _id: item.productId },
          {
            $pull: { 
              whoInCart: { userId: req.user.id } 
            }
          }
        );
      }

      setTimeout(async () => {
        try {
          const updatedOrder = await Order.findByIdAndUpdate(
            newOrder._id,
            { status: 'Received' },
            { new: true }
          );
          console.log(`Order ${updatedOrder._id} updated to "Received".`);
        } catch (error) {
          console.error(`Error updating order status ${newOrder._id}:`, error);
        }
      }, 5 * 60 * 1000);

    res.status(201).json(newOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when creating an order", error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error when retrieving orders", error: error.message });
  }
};
