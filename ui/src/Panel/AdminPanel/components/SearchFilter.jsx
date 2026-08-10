import "./../admin.css";

const SearchFilter = () => {
  return (
    <div className="search-filter">

      <input
        type="text"
        placeholder="Search..."
      />

      <select>
        <option>All Status</option>
        <option>Active</option>
        <option>Pending</option>
      </select>

    </div>
  );
};

export default SearchFilter;