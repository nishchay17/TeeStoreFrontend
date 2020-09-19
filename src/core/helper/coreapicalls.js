const { API } = require("../../backend");

export const getProduct = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
