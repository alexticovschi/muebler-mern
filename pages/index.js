import axios from "axios";
import ProductList from "../components/Index/ProductList";
import baseUrl from "../utils/baseUrl";

function Home({ products }) {
  return <ProductList products={products} />;
}

// add data to Home props
Home.getInitialProps = async () => {
  // fetch data on the server
  // return response data as an object
  // this object will be merged with existing props
  const url = `${baseUrl}/api/products`;
  const response = await axios.get(url);
  return {
    products: response.data
  };
};

export default Home;
