import cartModel from "../schemas/carts.schema.js";

class CartManagerDB {
    constructor() {
        this.cartsModel = cartModel;
    }
    async createNewCart() {
        try {
            const newCart = await this.cartsModel.create({ products: [] });
            return newCart;
        } catch (error) {
            throw new Error("Could not add cart");
        }
    }


    async getCartByID(id) {
        try {
            const cartFound = await this.cartsModel.findById(id);
            if (cartFound) {
                return cartFound;
            } else {
                return "Not Found";
            }
        } catch (error) {
            throw new Error("Could not get cart");
        }
    }

    async addToCart(cartID, prodID) {
        try {
            const cart = await this.cartsModel.findById(cartID);
            if (!cart) {
                throw new Error("Cart not found");
            }

            const prodIndex = cart.products.findIndex(
                (prod) => prod.product === prodID
            );
            if (prodIndex !== -1) {
                cart.products[prodIndex].quantity++;
            } else {
                const newProduct = { product: prodID, quantity: 1 };
                cart.products.push(newProduct);
            }

            await cart.save();
            return true;
        } catch (error) {
            throw new Error("Could not add products to cart: " + error);
        }
    }
}
export default CartManagerDB;
