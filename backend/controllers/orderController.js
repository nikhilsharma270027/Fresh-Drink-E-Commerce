import Orders from "../Schemas/Order.js";

export const getUserOrder = async (req, res) => {
    const { email } = req.body;
    console.log(req.body);

    try {
        const orders = await Orders.find({ email }); // Use await to get orders
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
