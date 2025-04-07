const fs = require('fs');
const path  = require('path');
const Cart = require('../models/cart');

const p = path.join(path.dirname(require.main.filename),
            'data',
            'products.json'
            ); 
            
const getProductsFromFile = callBackFun =>{
    fs.readFile(p,(err,fileContent)=>{
        if(err){
             callBackFun([]);
        }
        else{
            callBackFun(JSON.parse(fileContent)); 
        } 
    })
}

    module.exports = class Product {
    constructor(id,title,price,description,imageUrl){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    save(){ 
        getProductsFromFile(products=>{
        if(this.id){
            const existingProductIndex = products.findIndex(p => p.id === this.id)
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(p,JSON.stringify(updatedProducts),
            (err)=>{
                console.log(err);
            });
        }
       else{
        this.id = Math.random().toString();
        products.push(this)
        fs.writeFile(p,JSON.stringify(products),
        (err)=>{
            if(err){ 
                console.log(err);
            }
        });
       }
    });
}

    static deleteByID(id){
        getProductsFromFile(products=>{
      const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                if(!err){
                    const product = products.find(p => p.id === id);
                    Cart.deleteProduct(id,product.price); 
              }else{
                console.log(err);
              }
            });
        });
    }

    static fetchAll(callBackFun){
        getProductsFromFile(callBackFun);
    }

    static findById(id,cb){
        getProductsFromFile(products=>{
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

}