const fs = require('fs');
const path  = require('path');

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
    constructor(title,price,description,imageUrl){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    save(){ 
        this.id = Math.random().toString();
        getProductsFromFile(products=>{
        products.push(this)
        fs.writeFile(p,JSON.stringify(products),
        (err)=>{
            console.log(err);
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