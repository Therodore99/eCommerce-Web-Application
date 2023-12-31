import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    // categories,
    // category,
    // subs,
    // shipping,
    stock,
    images,
    // colors,
    brands,
    // color,
    brand,
    disabled
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>

      {/* <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"} //pre-populate
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div> */}

      <div className="form-group">
        <label>stock</label>
        <input
          type="number"
          name="stock"
          className="form-control"
          value={stock}
          onChange={handleChange}
        />
      </div>

      {/* <div className="form-group">
        <label>Color</label>
        <select 
        value={color} //pre-populate
        name="color" 
        className="form-control" 
        onChange={handleChange}>
          <option>Please select</option>
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div> */}

      <div className="form-group">
        <label>Brand</label>
        <select 
        value={brand} //pre-populate
        name="brand" 
        className="form-control" 
        onChange={handleChange}>
          <option>Please select</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Disabled</label>
        <select
          value={disabled=== "Yes" ? "Yes" : "No"} //pre-populate
          name="disabled"
          className="form-control"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
