import axios, {AxiosResponse} from "axios";
import { GetAllProductModel } from "../components/Models/GetAllProductModel";
import { ProductModel } from "../components/Models/ProductModel";

const API_URL = "https://dummyjson.com/products";

class ProductService {
	async getAll(): Promise<AxiosResponse<GetAllProductModel, any>> {
		return await axios.get<GetAllProductModel>(API_URL);
	}

	async getById(id: number):Promise<AxiosResponse<ProductModel, any>> {
		return await axios.get<ProductModel>(API_URL + "/" + id);
	}

	async delete(id: number): Promise<AxiosResponse<ProductModel, any>>  {
		return await axios.delete<ProductModel>(API_URL + "/" + id);
	}
    async add(product:ProductModel): Promise<AxiosResponse<ProductModel, any>>  {
		return await axios.post<ProductModel>(API_URL+"/add",product);
	}
}

// import ederken direkt bir instance sunar.
export default new ProductService();