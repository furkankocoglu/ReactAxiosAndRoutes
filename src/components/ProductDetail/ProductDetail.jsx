import React, { useEffect, useState } from "react";
export default function ProductDetail(props) {
  return (
    /*    
  "id": 1,
  "title": "iPhone 9",
  "description": "An apple mobile which is nothing like apple",
  "price": 549,
  "discountPercentage": 12.96,
  "rating": 4.69,
  "stock": 94,
  "brand": "Apple",
  "category": "smartphones",
  "thumbnail": "...",
  "images": ["...", "...", "..."]
}
    */
    <div className="container-md">
      <h1>{props.product.title}</h1>
      <div className="d-flex">
      <img className="img-fluid" src={props.product.thumbnail} />
        <div className="container">    
      <p><b>Marka : </b>{props.product.brand}</p>       
      <p><b>Kategori : </b>{props.product.category}</p>       
      <p><b>İndirimsiz Fiyat : </b>{props.product.price}$</p>
      <p><b>İndirim Oranı : </b>{props.product.discountPercentage}%</p>
      <p><b>İndirim: </b>{props.product.price*(props.product.discountPercentage/100)}$</p>
      <p><b>Fiyat: </b>{props.product.price-props.product.price*(props.product.discountPercentage/100)}$</p>
      <h5>Ürün Açıklaması</h5>
      <p>{props.product.description}</p>
      </div>
      </div>
      <br/>
      <div className="d-flex">
      <p><b>Değerlendirme : </b>{props.product.rating}</p>
      <p style={{paddingLeft:100}}><b>Stok Adedi : </b>{props.product.stock}</p>
      </div>      
      </div>
  );
}
