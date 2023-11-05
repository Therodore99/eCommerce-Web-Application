import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  //const [loading, setLoading] = useState(false);
  const { search } = useSelector((state) => ({ ...state })); // from reducer/index 
  const { text } = search;

  const navigate= useNavigate();

  const handleChange = (e) => {
    //if (loading) return; // don't show result while typing
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // don't reload the page
    navigate(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={handleChange} // push to redux store
        type="search"
        value={text}
        className="form-control mr-sm-2" //right margin
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
