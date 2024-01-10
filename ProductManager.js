const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.nextId = 1;
  }

  // Método para agregar un producto
  addProduct(product) {
    product.id = this.nextId++;
    const products = this.getProductsFromFile();
    products.push(product);
    this.saveProductsToFile(products);
  }

  // Método para obtener todos los productos
  getProducts() {
    return this.getProductsFromFile();
  }

  // Método para obtener un producto por su ID
  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find((p) => p.id === id);
    return product;
  }

  // Método para actualizar un producto por su ID
  updateProduct(id, updatedProduct) {
    const products = this.getProductsFromFile();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      updatedProduct.id = id;
      products[index] = updatedProduct;
      this.saveProductsToFile(products);
      return true;
    }
    return false;
  }

  // Método para eliminar un producto por su ID
  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      this.saveProductsToFile(products);
      return true;
    }
    return false;
  }

  // Método privado para leer los productos desde el archivo
  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      if (data) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  // Método privado para guardar los productos en el archivo
  saveProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
}
//Agregar nuevo product
let productManager = new ProductManager('products.json');
productManager.addProduct({ title: 'Product 1', description: 'Product 1 description', price: 100, thumbnail: 'product1.jpg', code: 'P1', stock: 10 });
productManager.addProduct({ title: 'Product 2', description: 'Product 2 description', price: 200, thumbnail: 'product2.jpg', code: 'P2', stock: 5 });
console.log(productManager.getProducts());

module.exports = ProductManager;
