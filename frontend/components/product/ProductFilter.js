import React, { useState, useEffect, useContext } from "react";
import ProductContext from "./../../context/productContext";
import InputRange from "react-input-range";
import { PRICE_INIT_VALUE } from "../../helpers";
import NumberFormat from "react-number-format";
import { CATEGORIES } from "../../constants";
const sizesFilter = [
  { value: "OS", status: false },
  { value: "XS", status: false },
  { value: "S", status: false },
  { value: "M", status: false },
  { value: "L", status: false },
  { value: "XL", status: false },
];
const ProductFilter = ({ genre }) => {
  const { setFilter, filter, shoppingRoute } = useContext(ProductContext);
  const initValues = {
    category: "",
    price: PRICE_INIT_VALUE,
    sizes: [],
  };

  const [change, saveChange] = useState(false);
  const [filterChange, saveFilterChange] = useState(false);
  const [filterObj, saveFilterObj] = useState(filter);
  const { category, sizes } = filterObj;
  const [checkValues, checkValuesSave] = useState(sizesFilter);
  const [priceFilter, savePriceFilter] = useState(PRICE_INIT_VALUE);
  const [filterBar, saveFilterBar] = useState(false);
  const [categoryCombo, saveCategoryCombo] = useState([]);
  const onChangeValue = (e) => {
    saveChange(true);
    saveFilterObj({
      ...filterObj,
      category: e.target.value,
    });
  };

  const onChangeValuePrice = async (e) => {
    saveChange(true);
    saveFilterObj({
      ...filterObj,
      price: e,
    });

    saveChange(true);
  };
  const onChangeValueChecks = (e) => {
    saveChange(true);
    let newArray;
    let setCheck;
    if (e.target.value !== "OS") {
      setCheck = checkValues.map((check) => {
        if (check.value === e.target.value) {
          check.status = e.target.checked;
          return check;
        }
        if (check.value === "OS") {
          check.status = false;
        }
        return check;
      });
      checkValuesSave(setCheck);
      if (!e.target.checked) {
        newArray = filterObj.sizes.filter(
          (item) => item.size !== e.target.value
        );
      }

      saveFilterObj({
        ...filterObj,
        sizes: e.target.checked
          ? [...sizes, { size: e.target.value }]
          : [...newArray],
      });
    } else {
      checkValuesSave([
        { value: "OS", status: e.target.checked },
        { value: "XS", status: false },
        { value: "S", status: false },
        { value: "M", status: false },
        { value: "L", status: false },
        { value: "XL", status: false },
      ]);

      saveFilterObj({
        ...filterObj,
        sizes: e.target.checked ? [{ size: e.target.value }] : [],
      });
    }
  };

  const cancelAction = (e) => {
    e.preventDefault();
    saveChange(true);
    saveFilterObj(initValues);
    savePriceFilter(PRICE_INIT_VALUE);
    const resetSizes = sizesFilter.map((size) => {
      return {
        ...size,
        status: false,
      };
    });
    checkValuesSave(resetSizes);
  };

  const checkFilterValues = () => {
    const keys = Object.keys(initValues);
    for (const key of keys) {
      if (key === "sizes") {
        if (initValues[key].length !== filterObj[key].length) {
          return saveFilterChange(true);
        }
      } else {
        if (initValues[key] !== filterObj[key]) {
          return saveFilterChange(true);
        }
      }
    }

    saveFilterChange(false);
  };
  useEffect(() => {
    if (change) {
      setFilter(filterObj);
    }

    checkFilterValues();
    saveChange(false);
    console.log(shoppingRoute);

    const newArray = CATEGORIES.filter((item) => {
      if (item.genre === "U") {
        return item;
      }
      if (item.genre === "W" && genre === "mujer") {
        return item;
      }
    });

    saveCategoryCombo(newArray);
    // eslint-disable-next-line
  }, [filterObj]);

  return (
    <>
      <aside className={`col_aside ${filterBar ? "active" : ""}`}>
        <div className="col_aside_inner">
          <form>
            <div className="filterBy">
              <div className="field">
                <label className="label-check">Por tipo</label>
                <div className="select-small ">
                  <div className="select-simple__container">
                    <select
                      name="category"
                      value={category}
                      onChange={onChangeValue}
                    >
                      <option value=""> Por tipo</option>

                      {categoryCombo.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="filterBy">
              <label className="label-check">
                Por precio máximo:{" "}
                <NumberFormat
                  value={priceFilter}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$ "}
                />
              </label>
              <div className="field-input-range">
                <InputRange
                  maxValue={PRICE_INIT_VALUE}
                  minValue={0}
                  name="price"
                  value={priceFilter}
                  onChange={savePriceFilter}
                  onChangeComplete={onChangeValuePrice}
                />
              </div>
            </div>

            <div className="filterBy">
              <label className="label-check">Tallas</label>
              <div className="sizes-list small-version">
                <ul>
                  {checkValues.map((option) => (
                    <li
                      key={option.value}
                      className={`${
                        option.value === "OS" ? "sizes-full-row" : ""
                      }`}
                    >
                      <label
                        className={`sizes-box active po-evt ${
                          option.status ? "selected" : ""
                        }`}
                      >
                        <strong>
                          <input
                            type="checkbox"
                            name="sizes"
                            checked={option.status}
                            value={option.value}
                            onChange={onChangeValueChecks}
                          />
                        </strong>
                        <span>
                          {option.value === "OS" ? "Unitalla" : option.value}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {filterChange && (
              <div className="filterBy">
                <button
                  type="button"
                  className="btn-medium  btn-color-4 btn-size-full"
                  onClick={cancelAction}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </form>
        </div>
        <div
          className={`close-filter-bar `}
          onClick={() => saveFilterBar(!filterBar)}
        ></div>
      </aside>
      <div
        className={`screen ${filterBar ? "shadow" : ""} `}
        onClick={() => saveFilterBar(false)}
      ></div>
    </>
  );
};

export default ProductFilter;
