
package com.ecom_project.ecommerce.service;

import com.ecom_project.ecommerce.model.Product;
import com.ecom_project.ecommerce.repository.ProductRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    // Get all products
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    // Get product by ID
    public Product getProductsById(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Product not found with ID: " + id
                ));
    }

    // Add a new product
    public Product addProducts(Product prod) {
        return repo.save(prod);
    }

    // Update an existing product
    public Product updateProducts(int prodId, Product prod) {

        Product existingProduct = repo.findById(prodId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Product not found with ID: " + prodId
                ));

        existingProduct.setName(prod.getName());
        existingProduct.setDescription(prod.getDescription());
        existingProduct.setBrand(prod.getBrand());
        existingProduct.setPrice(prod.getPrice());
        existingProduct.setCategory(prod.getCategory());
        existingProduct.setReleaseDate(prod.getReleaseDate());
        existingProduct.setAvailable(prod.isAvailable());
        existingProduct.setQuantity(prod.getQuantity());

        return repo.save(existingProduct);
    }

    // Delete a product
    public void deleteProducts(int prodId) {

        if (!repo.existsById(prodId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Product not found with ID: " + prodId
            );
        }

        repo.deleteById(prodId);
    }

    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
}
