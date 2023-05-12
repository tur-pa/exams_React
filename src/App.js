import Header from "./components/Header/Header";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import styles from "./App.module.scss";
import { Navigate, Outlet } from "react-router-dom";

function App(props) {
  const userExist = localStorage.getItem("user");
  if (!userExist) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.appWrapper}>
      <Header />
      <ProductsFilters />
      <Outlet />
    </div>
  );
}

export default App;
