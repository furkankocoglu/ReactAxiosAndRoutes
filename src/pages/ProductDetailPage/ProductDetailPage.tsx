import { useEffect, useState } from 'react'
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import ProductService from '../../Services/ProductService';
import { ProductModel } from '../../components/Models/ProductModel';

function GetPageId():number{
  let pageId=new URLSearchParams(window.location.search).get("id");  
    return parseInt(pageId?pageId:"-1");
}


export default function ProductDetailPage() {    
    const [product,setProduct]=useState<ProductModel>();
    useEffect(() => {
        GetProduct(GetPageId());
    }, [])    
    const GetProduct= async (id:number)=>{
        let result =  await ProductService.getById(id);
        let product = await result.data;
        setProduct(product);
    }
  return (      
    <>    
    {product?<ProductDetail product={product} />:null}
    </>
  )
}