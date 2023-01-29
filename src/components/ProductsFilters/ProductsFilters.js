import React from "react";
import styles from "../../common/styles/Headers.module.scss";

class ProductsFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productsToFilter: this.props.productsToFilter,
      searchPhrase: ``,
      searchCategory: ``,
      searchOnlyGroceries: false,
    };

    this.filterProducts = this.filterProducts.bind(this);
    this.uniqueCategory = this.uniqueCategory.bind(this);
  }

  //CHECK IF WE ADD NEW PRODUCT TO FILTER
  componentDidUpdate(prevProps, prevState) {
    if (prevState.productsToFilter !== this.props.productsToFilter) {
      this.setState({
        productsToFilter: this.props.productsToFilter,
      });
    }
  }

  //////// FILTER ////////

  filterProducts = () => {
    // FILTER BY PHRASE //
    let filteredProducts = this.state.productsToFilter.filter((currProduct) =>
      currProduct.nazwa.includes(this.state.searchPhrase.toLowerCase())
    );
    // FILTER BY GROCERIES //
    if (this.state.searchOnlyGroceries) {
      filteredProducts = this.state.productsToFilter.filter(
        (currProduct) => currProduct.produktSpozywczy
      );
    }
    // FILTER BY CATEGORY //
    if (this.state.searchCategory) {
      filteredProducts = this.state.productsToFilter.filter(
        (currProduct) => currProduct.kategoria === this.state.searchCategory
      );
    }

    this.props.sendFilteredNazwaToParentComponent(filteredProducts);
  };

  //////// FILTER BY PHRASE ////////

  handleSearchPhraseChange = (event) => {
    event.preventDefault();
    this.setState({ searchPhrase: event.target.value }, () =>
      this.filterProducts()
    );
  };

  //////// FILTER BY CATEGORY ////////

  handleSelectCategory = (event) => {
    event.preventDefault();
    this.setState({ searchCategory: event.target.value }, () =>
      this.filterProducts()
    );
  };

  uniqueCategory = () => {
    const categoryList = this.state.productsToFilter.map((currCategory) => {
      return currCategory.kategoria;
    });
    const uniqueCategoryEl = [...new Set(categoryList)];
    return uniqueCategoryEl;
  };

  //////// FILTER BY CHECKBOX GROCERIES////////

  handleOnlyGroceriesChange = (event) => {
    this.setState({ searchOnlyGroceries: event.target.checked }, () =>
      this.filterProducts()
    );
  };

  render() {
    const uniqueCategoryList = this.uniqueCategory();
    return (
      <div className={styles.Wrapper}>
        <div>
          <p>Products Filters</p>
          <input
            value={this.state.searchPhrase}
            onChange={this.handleSearchPhraseChange}
          ></input>
          <button onClick={this.filterProducts}>Search</button>
          <br />
          <p>Filter by category</p>
          <select onChange={this.handleSelectCategory}>
            {uniqueCategoryList.map((currCategory) => (
              <option key={currCategory} value={currCategory}>
                {currCategory}
              </option>
            ))}
          </select>
          <p>Filter by groceries</p>
          <input
            type="checkbox"
            onChange={this.handleOnlyGroceriesChange}
            value={this.state.searchOnlyGroceries}
          ></input>
        </div>
      </div>
    );
  }
}

export default ProductsFilters;
