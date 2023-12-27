import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios, { HttpStatusCode } from "axios";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const location = useLocation();
  const [products, setProducts] = useState<any[]>();
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (products!= null && location.state != null) {
      AddProduct(location.state);
    }
  }, [products]);

  const fetchProducts = async () => {
    let response = await axios.get("https://dummyjson.com/products");
    setProducts(response.data.products);
  };
  async function DeleteProduct(id: string) {
    let deletedProduct = await axios.delete(
      "https://dummyjson.com/products/" + id
    );
    if (deletedProduct.status == 200) {
      let getFilteredProducts = products?.filter((item) => item.id != id);
      setProducts(getFilteredProducts);
      alert(deletedProduct.data.title + " silindi.");
    }
  }
  async function AddProduct(product: any) {
    await window.history.replaceState(null, document.title);
    location.state = null;
    let addedProduct = await axios.post(
      "https://dummyjson.com/products/add",
      product
    );
    

    if (addedProduct.status == HttpStatusCode.Ok) {
      if (products!=null){      
       setProducts([...products, addedProduct.data]);
      }
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
