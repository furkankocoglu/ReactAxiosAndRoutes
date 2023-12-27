import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

function GetPageId():string|null{
    return new URLSearchParams(window.location.search).get("id");
}


export default function ProductDetailPage() {    
    const [product,setProduct]=useState({});
    useEffect(() => {
        GetProduct(GetPageId());
    }, [])    
    const GetProduct= async (id:string|null)=>{
        let result =  await axios.get("https://dummyjson.com/products/"+id)
        let product = await result.data;
        console.log(product);
        setProduct(product);
        return product;
    }
  return (      
    <>    
    {Object.values(product).length!=0?<ProductDetail product={product} />:null}
    </>
  )
}