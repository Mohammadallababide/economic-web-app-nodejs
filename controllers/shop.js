const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([row])=>{
    res.render('shop/product-list', {
      prods: row,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req,res,next)=>{
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product])=>{
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product[0].title,
      path: '/products'
    });
  }).catch(err=>{
    console.log(err);
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([row,filedData])=>{
     res.render('shop/index', {
      prods: row,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err=>{
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartProduct = [];
      for(prod of products ){
        const cartProductData = cart.products.find(p => p.id === prod.id);
        if(cartProductData){
          cartProduct.push({productData :prod, qty : cartProductData.qty })
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartProduct
      });
    })
  });
};

exports.postCart = (req,res,next)=>{
  const prodId = req.body.productId
  Product.findById(prodId , product=>{
    Cart.addProduct(prodId,product.price)
  });
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCartDeleteProduct= (req ,res ,next)=>{
const prodId = req.body.productId ; 
Product.findById(prodId , product =>{
  Cart.deleteProduct(prodId,product.price);
  res.redirect('/cart');
});
}
