const Cart = require('../models/cart.model')

function initializeCart(req, res, next) {
  let cart;
  
  if (!req.sessions.cart) {
    cart = new Cart();
  } else {
    cart = new Cart(req.sessions.cart.items);
  }

  res.locals.cart = cart;

  next();
}

module.exports = initializeCart;