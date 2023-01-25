import { React, useState } from "react";
import styles from "../../common/styles/Headers.module.scss";

function AddProducts(props) {
  const [newProduct, setNewProduct] = useState({
    productName: ``,
    category: ``,
    groceries: false,
  });

  function handleChange(event) {
    event.preventDefault();
    setNewProduct({
      ...newProduct,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  }

  function handleAddNewProduct() {
    const addProduct = [
      {
        nazwa: newProduct.productName,
        kategoria: newProduct.category,
        produktSpozywczy: newProduct.groceries,
      },
    ];
    props.sendNewProductToParent((listOfPrimiaryProducts) => [
      ...listOfPrimiaryProducts,
      ...addProduct,
    ]);
  }

  return (
    <div className={styles.Wrapper}>
      <div>
        <p>Add products</p>
        <p>Name product</p>
        <input
          name="productName"
          value={newProduct.productName}
          onChange={handleChange}
        ></input>
        <p>Name category</p>
        <input
          name="category"
          value={newProduct.category}
          onChange={handleChange}
        ></input>
        <p>Is it groceries?</p>
        <input
          name="groceries"
          type="checkbox"
          value={newProduct.groceries}
          onChange={handleChange}
        ></input>
        <br></br>
        <button onClick={handleAddNewProduct}>Add new product</button>
      </div>
    </div>
  );
}

export default AddProducts;

// function handleAddNewProduct() {
//   const addProduct = newList.concat([
//     {
//       nazwa: newProduct.productName,
//       kategoria: newProduct.category,
//       produktSpozywczy: newProduct.groceries,
//     },
//   ]);
//   // setNewList(addProduct);
//   props.sendNewProductsToParent(addProduct);
