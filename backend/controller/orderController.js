module.exports.createOrder = async (req, res) => {
    const {cartItems, userInfo } = req.body;
    try {
        const order = new Order({
            user: userInfo,
            items: cartItems,
            status: "pending",
            total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        });
        await order.save();
        res.status(201).json(order);
    }

    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}
