import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios, { HttpStatusCode } from "axios";
import { useLocation } from "react-router-dom";
import { ProductModel } from "../../components/Models/ProductModel";
import ProductService from "../../Services/ProductService";

export default function Homepage() {
  const location = useLocation();
  const [products, setProducts] = useState<ProductModel[]>([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (products.length!=0 && location.state != null) {
      AddProduct(location.state);
    }
  }, [products]);

  const fetchProducts = async () => {
    let response = await ProductService.getAll();
    setProducts(response.data.products);
  };
  async function DeleteProduct(id: number) {
    let deletedProduct = await ProductService.delete(id);
    if (deletedProduct.status == HttpStatusCode.Ok) {
      let getFilteredProducts = products.filter((item) => item.id != id);
      setProducts(getFilteredProducts);
      alert(deletedProduct.data.title + " silindi.");
    }
  }
  async function AddProduct(product: ProductModel) {
    await window.history.replaceState(null, document.title);
    location.state = null;
    let addedProduct = await ProductService.add(product)
    

    if (addedProduct.status == HttpStatusCode.Ok) {  
       setProducts([...products, addedProduct.data]);      
      alert(addedProduct.data.title + " eklendi.");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {products?.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-12 mb-5">
            <ProductCard product={product} delete={DeleteProduct} />
          </div>
        ))}
      </div>
    </div>
  );
}
