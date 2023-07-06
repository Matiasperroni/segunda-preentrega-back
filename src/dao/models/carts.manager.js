import cartModel from "../schemas/carts.schema.js";

class CartManagerDB {
    constructor() {
        this.cartsModel = cartModel;
    }

    async getCarts () {
        try {
            const carts = await this.cartsModel.find().lean()
            return carts
        } catch (error) {
            throw new Error("Could not get carts.")
        }
    }
    async createNewCart() {
        try {
            const newCart = await this.cartsModel.create({ products: [] });
            return newCart;
        } catch (error) {
            throw new Error("Could not add cart");
        }
    }


    // const cartFound = await this.cartsModel.find({_id: id}).populate("products.product");
    async getCartByID(id) {
        try {
            const cartFound = await this.cartsModel.findById(id).populate("products.product").lean()
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
            console.log(cart);
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
    async deleteProdFromCart(cartID, prodID) {
        try {
            const cart = await this.cartsModel.findById(cartID)
            console.log("from cart", cart);
            const prodIndex = cart.products.findIndex(
                (prod) => prod.product === prodID
            );
            console.log("from prod", prodIndex);
            if (prodIndex !== -1) {
                cart.products[prodIndex].quantity++;
            } else {
                const prodToDelete = { product: prodID };
                cart.products.splice(prodToDelete, 1);
            }
            await cart.save();
            return cart
        } catch(error) {
            throw new Error("It doesn´t exists a cart or product with such ID.")
        }
    }
    async updateWholeCart (cartID, prods) {
        try {
            // const cartToUpdate = await this.cartsModel.findById(cartID);
            const updatedCart = await this.cartsModel.findOneAndUpdate(cartID, prods)
            console.log("updated cart", updatedCart);
            
            return updatedCart;
        } catch(error) {
            // throw new Error("Couldn´t update cart.")
            console.log("no anda");
        }
    }
}
export default CartManagerDB;
