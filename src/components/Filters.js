import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const initialFilter = {
  category: [],
  colors: [],
  company: [],
  maxPrice: 0,
};

const Filters = () => {
  const [filterGroup, setfilterGroup] = useState(initialFilter);
  const {
    filterState,
    handleChangeFilter,
    setDefaultPrice,
    handleClearFilter,
  } = useFilterContext();
  const { filter, initialProducts } = filterState;

  const { text } = filter;

  useEffect(() => {
    if (initialProducts.length > 0) {
      const result = getUniqueValues(initialProducts);
      setfilterGroup({ ...result });
      setDefaultPrice(result.maxPrice);
    }
    // eslint-disable-next-line
  }, [initialProducts]);

  return (
    <Wrapper>
      <div className="content">
        <div className="form-control">
          <input
            type="text"
            name="text"
            placeholder="search"
            className="search-input"
            value={text}
            onChange={handleChangeFilter}
          />
        </div>
        <div className="form-control">
          <h5>category</h5>
          <div>
            <button
              name="category"
              value="All"
              onClick={handleChangeFilter}
              className={filter.category === "All" ? "active" : "null"}
            >
              all
            </button>
            {filterGroup.category.map((cat, index) => {
              return (
                <button
                  name="category"
                  key={index}
                  value={cat}
                  onClick={handleChangeFilter}
                  className={filter.category === cat ? "active" : "null"}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>company</h5>
          <select
            name="company"
            className="company"
            value={filter.company}
            onChange={handleChangeFilter}
          >
            <option value="All">all</option>
            {filterGroup.company.map((company, index) => {
              return (
                <option value={company} key={index}>
                  {company}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control">
          <h5>colors</h5>
          <div className="colors">
            <button
              className={filter.color === "All" ? "all-btn active" : "all-btn"}
              name="color"
              data-color="All"
              onClick={handleChangeFilter}
            >
              all
            </button>
            {filterGroup.colors.map((color, index) => {
              return (
                <button
                  key={index}
                  name="color"
                  className={
                    filter.color === color ? "color-btn active" : "color-btn"
                  }
                  data-color={color}
                  style={{ backgroundColor: color }}
                  onClick={handleChangeFilter}
                >
                  {filter.color === color && <FaCheck />}
                </button>
              );
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{formatPrice(filter.price)}</p>
          <input
            type="range"
            name="price"
            min="0"
            max={filterGroup.maxPrice}
            onChange={handleChangeFilter}
            value={filter.price}
          />
        </div>
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input
            checked={filter.shipping}
            type="checkbox"
            name="shipping"
            id="shipping"
            onChange={handleChangeFilter}
          />
        </div>
        <button
          type="button"
          className="clear-btn"
          onClick={() => handleClearFilter(filterGroup.maxPrice)}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
