
package com.ecom_project.ecommerce.controller;

import com.ecom_project.ecommerce.model.Product;
import com.ecom_project.ecommerce.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService service;

    // Welcome message
    @GetMapping("/")
    public ResponseEntity<String> greet() {
        return ResponseEntity.ok("Welcome to this ecommerce");
    }

    // Get all products
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    // Get product by ID
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductsById(
            @PathVariable int id) {

        Product product = service.getProductsById(id);
        return ResponseEntity.ok(product);
    }

    // Add a new product
    @PostMapping("/products")
    public ResponseEntity<Product> addProducts(
            @RequestBody Product prod) {

        Product savedProduct = service.addProducts(prod);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedProduct);
    }

    // Update an existing product
    @PutMapping("/products/{prodId}")
    public ResponseEntity<Product> updateProducts(
            @PathVariable int prodId,
            @RequestBody Product prod) {

        Product updatedProduct =
                service.updateProducts(prodId, prod);

        return ResponseEntity.ok(updatedProduct);
    }

    // Delete a product
    @DeleteMapping("/products/{prodId}")
    public ResponseEntity<Void> deleteProducts(
            @PathVariable int prodId) {

        service.deleteProducts(prodId);

        return ResponseEntity.noContent().build();
    }

    //Search Product
    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword){
       List<Product> products = service.searchProducts(keyword);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
}
