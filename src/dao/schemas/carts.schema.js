import mongoose from "mongoose";
const collection = "carts";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: String,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
});

const cartModel = mongoose.model(collection, cartSchema);
export default cartModel;