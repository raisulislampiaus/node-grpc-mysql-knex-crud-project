const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);

// const productProtoPath = path.join(__dirname, '..', '..', 'protos', 'product.proto');
const productProtoPath = path.join(__dirname, '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;
const client = new productPackageDefinition.ProductService(
  'localhost:50000', grpc.credentials.createInsecure());





function listProducts(){
    
    knex('products')
       .then((data) => {
         console.log(data)
       })
    
}


function createProduct(){
  knex('products')
    .insert({
      name: 'piaus',
      price: '12',
    })
    .then((data) => {
      console.log(data)
    })
}




function main() {
    listProducts();
    createProduct()

}
main()
