const fetch = require("node-fetch");
let index = 0;
async function fetchProducts(nextCursor) {
  const fetchUrl = nextCursor
    ? `https://api.viator.com/partner/products/modified-since?count=500&cursor=${nextCursor}`
    : "https://api.viator.com/partner/products/modified-since?count=500";
  const response = await fetch(fetchUrl, {
    headers: {
      "exp-api-key": "15f04fef-e879-4b45-86c0-84589e8a160d",
      "Accept-language": "en-US",
      Accept: "application/json;version=2.0",
    },
  });
  const fProducts = await response.json();
  console.log(index++);
  if (fProducts?.products.length) {
    return await fetchProducts(fProducts?.nextCursor);
  }
  console.log(fProducts?.products?.length);
  return fProducts;
}
//fetchProducts();

async function getAllProducts(nextCursor = "", data = []) {
  const fetchUrl = nextCursor
    ? `https://api.viator.com/partner/products/modified-since?count=500&cursor=${nextCursor}`
    : "https://api.viator.com/partner/products/modified-since?count=500";
  const response = await fetch(fetchUrl, {
    headers: {
      "exp-api-key": "15f04fef-e879-4b45-86c0-84589e8a160d",
      "Accept-language": "en-US",
      Accept: "application/json;version=2.0",
    },
  });
  const result = data.filter((item) => item.status !== "INACTIVE");
  const result2 = data.filter((item) => item.status === "INACTIVE");
  console.log("Total products so far", data.length);
  console.log("Active products so far", result.length);
  console.log("Inactive products so far", result2.length);
  const fProducts = await response.json();
  if (fProducts?.products.length < 1) return data;
  data.push(...fProducts?.products);
  return getAllProducts(fProducts?.nextCursor, data);
}
// use it to get data
getAllProducts();
