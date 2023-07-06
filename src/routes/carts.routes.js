import { Router } from "express";
// import CartManager from "../dao/managers/CartsManager.js";
import CartManagerDB from '../dao/models/carts.manager.js';
const router = Router();

const cartManager = new CartManagerDB();

router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts();
    // carts.forEach(cart => console.log(cart.products))
    res.send(carts)
})

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
        const products = cart.products
        // res.send({products});
        res.render("cart", {products});
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

router.delete("/:cid/products/:pid", async (req, res) => {
    const cartID = req.params.cid;
    const prodID = req.params.pid;
    console.log(cartID, prodID);
    const deleted = await cartManager.deleteProdFromCart(cartID, prodID)
    res.send(deleted)
})

router.put("/:cid", async (req, res) => {
    const cartID = req.params.cid;
    const prod = req.body;
    console.log(cartID, prod);
    const updatedCart = await cartManager.updateWholeCart(cartID, prod)
    res.send(updatedCart)
})

router.put("/:cid/products/:pid", async (req, res) => {

})

router.delete("/:cid", async (req, res) => {

})



export default router;
