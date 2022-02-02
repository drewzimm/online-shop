const Product = require('../models/product.model');

function getCart(req, res) {
  res.render('customer/cart/cart');
}

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart; //update cart

  res.status(201).json({
    message: 'Cart updated!',
    newTotalItems: cart.totalQuantity,
  });
}

function updateCartItem(req, res) {
  const cart = res.locals.cart;

  const updatedItem = cart.updateItem(req.body.productId, req.body.quantity);

  req.session.cart = cart;

  res.json({
    message: 'Item updated!',
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItem.updatedItemPrice,
    }
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
