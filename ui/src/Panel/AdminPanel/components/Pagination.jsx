import "./../admin.css";

const Pagination = () => {
  return (
    <div className="pagination">

      <button>Previous</button>

      <button className="active-page">
        1
      </button>

      <button>2</button>
      <button>3</button>

      <button>Next</button>

    </div>
  );
};

export default Pagination;