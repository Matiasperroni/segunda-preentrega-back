import { Router } from "express";
// import CartManager from "../dao/managers/CartsManager.js";
import CartManagerDB from '../dao/models/carts.manager.js';
const router = Router();

const cartManager = new CartManagerDB();

router.post("/", async (req, res) => {
    try {
        const products = req.body;
        const cartAdded =  await cartManager.createNewCart(products);
        res.send(cartAdded);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los datos");
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const cartID = req.params.cid;
        const cart = await cartManager.getCartByID(cartID);
        res.send(cart.products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los datos");
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartID = req.params.cid;
        const prodID = req.params.pid;
        const productAddedToCart = await cartManager.addToCart(cartID, prodID);
        res.send(productAddedToCart);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error, unable to obtain data");
    }
});

export default router;
