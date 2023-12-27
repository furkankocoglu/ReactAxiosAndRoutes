import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  let isAdded=false;

  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
	console.log(location.state);
    if (products.length != 0 && location.state != null) {
		console.log("add");	
      AddProduct(location.state);
    }
  }, [products]);

  const fetchProducts = async () => {
    let response = await axios.get("https://dummyjson.com/products");
    setProducts(response.data.products);
  };
  async function DeleteProduct(id) {
    let deletedProduct = await axios.delete(
      "https://dummyjson.com/products/" + id
    );
    if (deletedProduct.status == 200) {
      let getFilteredProducts = products.filter((item) => item.id != id);
      setProducts(getFilteredProducts);
      alert(deletedProduct.data.title + " silindi.");
    }
  }
  async function AddProduct(product) { 
	await window.history.replaceState(null,document.title);
	location.state=null;   
    let addedProduct= await axios.post("https://dummyjson.com/products/add",product);	
	 if(addedProduct.status==200){			 
       	setProducts([...products,addedProduct.data]);		
       	alert(addedProduct.data.title+" eklendi.");
      }
	
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-12 mb-5">
            <ProductCard product={product} delete={DeleteProduct} />
          </div>
        ))}
      </div>
    </div>
  );
}
