import React, { useEffect, useState } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { filterProducts } from "../../redux/productsSlice";
import { useDispatch } from "react-redux";

function ProductsFilters() {
  const [filteredProd, setFilteredProd] = useState("");
  const [isFood, setIsFood] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterProducts({ filteredProd: filteredProd, isFood: isFood }));
  }, [filteredProd, isFood]);

  const handleSearchPhraseChange = (event) => {
    event.preventDefault();
    setFilteredProd(event.target.value);
    console.log(filteredProd);
  };

  const handleCheckBox = () => {
    setIsFood(!isFood);
  };

  return (
    <div className={styles.filtersHeaderWrapper}>
      <Typography variant="h4">Filtruj produkty: </Typography>
      <FormGroup>
        <div className={styles.filtersForm}>
          <FormControlLabel
            control={
              <TextField
                margin="dense"
                label="Nazwa"
                variant="outlined"
                value={filteredProd}
                onChange={(event) => handleSearchPhraseChange(event)}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Tylko produkty spożywcze"
            checked={isFood}
            onChange={() => handleCheckBox()}
          />
        </div>
      </FormGroup>
    </div>
  );
}

export default ProductsFilters;
