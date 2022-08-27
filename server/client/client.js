// const PROTO_PATH = './proto/products.proto';

// const grpc = require('grpc');
// const protoLoader = require('@grpc/proto-loader');

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   longs: String,
//   enums: String,
//   arrays: true,
// });

// const ProductService = grpc.loadPackageDefinition(packageDefinition).ProductService;
// const client = new ProductService('localhost:3000', grpc.credentials.createInsecure());

// module.exports = client;

const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');
const environment = process.env.ENVIRONMENT || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

const productProtoPath = path.join(__dirname, '..', '..', 'protos', 'product.proto');
// const productProtoPath = path.join(__dirname, '..', 'protos', 'product.proto');
// const productProtoPath = path.join(__dirname, '..', '..', 'protos', 'product.proto');
const productProtoDefinition = protoLoader.loadSync(productProtoPath);
const productPackageDefinition = grpc.loadPackageDefinition(productProtoDefinition).product;
const client = new productPackageDefinition.ProductService(
  'localhost:50000', grpc.credentials.createInsecure());






module.exports = client;