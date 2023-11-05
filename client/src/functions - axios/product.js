import axios from "axios";


export const createProduct = async (product) =>
  await axios.post(`${process.env.REACT_APP_API}/product`, product);



//list ALL without user /shop/products/:count
export const getAllProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API}/shop/products/${count}`);



//listAllbyUser
export const getProductsByCount = async ( count, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/products/${count}`,
  {headers: {
    authtoken,
  },
  });


export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });


//read to update
export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

  //find seller name /users/:id
export const getSeller = async (id) =>
await axios.get(`${process.env.REACT_APP_API}/users/${id}`);


//update
export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });


//show on homepage based on {sort, order, limit} 
export const getProducts = async (sort, order, page) =>
  await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
  });


//
export const getProductsCount = async () =>
  await axios.get(`${process.env.REACT_APP_API}/products/total`);
;


export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );

  
//filter products 
export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
