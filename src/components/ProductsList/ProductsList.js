import React from "react";

import commonColumnsStyles from "../../common/styles/Columns.module.scss";

class ProductsList extends React.Component {
  constructor(props) {
    super(props);

    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(index) {
    this.props.sendAddedProductsToParent([this.props.newProductsList[index]]);
  }

  render() {
    return (
      <div className={commonColumnsStyles.App}>
        <header className={commonColumnsStyles.AppHeader}>
          <p>Products list</p>
          <ul>
            {this.props.newProductsList.map((currProduct, index) => (
              <li key={index} onClick={() => this.addProduct(index)}>
                {currProduct.nazwa}
              </li>
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default ProductsList;
