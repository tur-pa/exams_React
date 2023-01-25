import { useEffect, useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";

function ShopingList(props) {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    setShoppingList((prevShoppingList) => [
      ...prevShoppingList,
      ...props.productsToBuy,
    ]);
  }, [props.productsToBuy]);

  function removeClick(e, index) {
    e.preventDefault();
    setShoppingList(shoppingList.filter((currProduct, i) => i !== index));
  }

  function handleStyle(e) {
    e.preventDefault();
    if (e.target.style.textDecoration) {
      e.target.style.removeProperty("text-decoration");
    } else {
      e.target.style.setProperty("text-decoration", "line-through");
    }
  }

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shoping List</p>
        <ul>
          {shoppingList.length
            ? shoppingList.map((currProduct, index) => (
                <li
                  onClick={(e) => removeClick(e, index)}
                  onContextMenu={(e) => handleStyle(e, index)}
                  key={index}
                >
                  {currProduct.nazwa}
                </li>
              ))
            : null}
        </ul>
      </header>
    </div>
  );
}

// onContextMenu;

export default ShopingList;
