const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config);


const productProtoPath = path.join(__dirname, '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;



function listProducts(call, callback) {
  knex('products')
  .then((data) => { callback(null, { products: data }); });
}


function readProduct(call, callback) {
  knex('products')
  .where({ id: parseInt(call.request.id) })
  .then((data) => {
    if (data.length) {
      callback(null, data[0]);
    } else {
      callback('That product does not exist');
    }
  });
}



function createProduct(call, callback) {
  knex('products')
    .insert({
      name: call.request.name,
      price: call.request.price,
    })
    .then(() => { callback(null, { status: 'success' }); });
}
function updateProduct(call, callback) {
  knex('products')
    .where({ id: parseInt(call.request.id) })
    .update({
      name: call.request.name,
      price: call.request.price,
    })
    .returning()
    .then((data) => {
      if (data) {
        callback(null, { status: 'success' });
      } else {
        callback('That product does not exist');
      }
    });
}
function deleteProduct(call, callback) {
  knex('products')
  .where({ id: parseInt(call.request.id) })
  .delete()
  .returning()
  .then((data) => {
    if (data) {
      callback(null, { status: 'success' });
    } else {
      callback('That product does not exist');
    }
  });
}


function main() {
  const server = new grpc.Server();
  
  server.addService(productPackageDefinition.ProductService.service, {
    listProducts: listProducts,
    readProduct: readProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
  });
  
  server.bind('localhost:50000', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC server running at http://127.0.0.1:50000');
}
main()