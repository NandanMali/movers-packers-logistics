import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../components/Alert/alert";
import ConfirmModal from "../../components/confirmationBox/ConfirmationBox";
import { apiUrlCategory ,catuploadurl ,apiUrlSubcategory } from "../../apiUrl";
import { useNavigate } from "react-router-dom";

const AdminCategories = () => {
  const [alertData, setAlert] = useState(null);
  const [categories, setCategories] = useState({
    cName: "",
    file: null,
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [deleteSubCategories,setDeleteSubCategories]=useState();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [errors, setErrors] = useState({});

  //validation

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "cName":
        if (!value.trim()) {
          error = "Category Name is required";
        }
        break;

      case "file":
        if (!value) {
          error = "Category Icon Image is required";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategories((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateForm = () => {
    let newErrors = {};

    // Name Validation
    if (!categories.cName.trim()) {
      newErrors.cName = "Category Name is required";
    }

    // File Validation
    if (!categories.file) {
      newErrors.file = "Category Icon Image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setErrors({});
      setAlert(null);
      const formdata1 = new FormData();
      formdata1.append("cName", categories.cName);
      formdata1.append("cIcon", categories.file);
      axios.post(apiUrlCategory + "save", formdata1)
        .then((res) => {
          setAlert({
            message: "Category Added Successful",
            type: "successAlert",
          });
          setCatdata((prevcatdata) => [...prevcatdata , res.data.Added]);
          setCategories({ cName: "", file: null });
          setProfilePreview(null);
          setAddcat(false);
        })
        .catch((err) => {
          setAlert({ message: "Category Addition Failed", type: "errorAlert" });
        })
        
    }
  };

  const [search, setSearch] = useState("");
  const [catdata, setCatdata] = useState([]);

  useEffect(() => {
      axios.get(apiUrlCategory + "fetch").then((res) => {
        setCatdata(res.data);
      });
    }, []);
    
  const filteredcategories = catdata.filter((category) =>
    category?.cName?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id,name) => {
    setSelectedCategoryId(id);
    setConfirmDelete(true);
    setDeleteSubCategories(name);
  };

  const confirmDeleteCategory = () => {
    setAlert(null);
    axios
      .delete(apiUrlCategory + "delete", {
        data: { condition_obj: { _id: selectedCategoryId } },
      })
      .then(() => {

        axios
      .delete(apiUrlSubcategory + "delete", {
        data: { condition_obj: { cName : deleteSubCategories  } },
      })
      .then(() => {
        setAlert({
          message: "Category and its sub Categories Deleted Successfully",
          type: "successAlert",
        });})
        setCatdata((prevcatdata) =>
          prevcatdata.filter((category) => category._id !== selectedCategoryId),
        );
        setConfirmDelete(false);
        setSelectedCategoryId(null);
        setDeleteSubCategories(null);
      })
      .catch((err) => {
        if (err.data.status===404) {
          setCatdata((prevcatdata) =>
          prevcatdata.filter((category) => category._id !== selectedCategoryId),
        );
        }
        setAlert({
          message: "Failed to delete category",
          type: "errorAlert",
        });
        setConfirmDelete(false);
        setSelectedCategoryId(null);
      });
  };

  const cancelDeleteCategory = () => {
    setConfirmDelete(false);
    setSelectedCategoryId(null);
    setDeleteSubCategories(null);
  };

  const [addcat, setAddcat] = useState(false);
  // =========================
  // IMAGE PREVIEW
  // =========================


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCategories((prev) => ({ ...prev, file }));

    validateField("file", file);

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setProfilePreview(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleAddcategory = () => {
    setAddcat(!addcat);
  };

  const handleSubcategory = (catName) => {
    
    navigate(`/admin/categories/subcategories/${catName}`);
  };

  return (
    <>
      <div className="users-page">
        {alertData && <Alert message={alertData.message} type={alertData.type} />}
        <ConfirmModal
          isOpen={confirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete this category and all its sub-categories?"
          onConfirm={confirmDeleteCategory}
          onCancel={cancelDeleteCategory}
        />

        <div className="users-top">
          <div>
            <h1>Category Management</h1>
            <p>Manage all Categories</p>
          </div>

          <button className="add-btn" onClick={handleAddcategory}>
            + Add Category
          </button>
        </div>

        <div className="users-stats">
          <div className="mini-card">
            <h3>{catdata.length}</h3>
            <p>Total Categories</p>
          </div>

          <div className="mini-card">
            <h3>3456</h3>
            <p>Avaliable Categories</p>
          </div>

          <div className="mini-card">
            <h3>2345</h3>
            <p>Unavaliable Categories</p>
          </div>
        </div>

        {addcat && (
          <div className="admin-page">
            <div className="page-header">
              <h2> Add Category</h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
              }}
            >
              <div className="upload-section" style={{ height: "25vh" }}>
                <div className="avatar-preview">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="profile"
                      style={{ display: "block" }}
                    />
                  ) : (
                    <i className="fas fa-camera"></i>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  name="file" 
                  onChange={handleImageUpload}
                  id="profileImage"
                />
                <label htmlFor="profileImage" className="upload-btn">
                  Add Category Icon
                </label>
                {errors.file && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.file}
                  </span>
                )}
              </div>
              <div className="input-group" style={{ width: "60vh" }}>
                <label>
                  <h4>Category Name</h4>
                </label>

                <input
                  type="text"
                  placeholder="Enter Category Name"
                  name="cName"
                  value={categories.cName}
                  onChange={handleChange}
                />
                {errors.cName && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.cName}
                  </span>
                )}
              </div>
              <button
                className="add-btn"
                onClick={handleSubmit}
                style={{ height: "10vh", marginTop: "3vh" }}
              >
                + Add Category
              </button>
            </div>
          </div>
        )}
        <br />

        <div className="admin-page">
          <div className="page-header">
            <h2>Categories List</h2>

            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Icon</th>
                  <th>category Name</th>
                  <th>Sub Category</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {filteredcategories.map((category) => (
                  <tr key={category._id}>
                    <td>{category._id}</td>
                    <td><img src={catuploadurl+category.cIcon} style={{height:"100px",width:"100px", borderRadius:"50%"}} alt=""/></td>
                    <td>{category.cName}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => {
                          handleSubcategory(category.cName);
                        }}
                      >
                        View Sub category
                      </button>
                    </td>
                    <td>
                    <button
                        className="edit-btn"
                        onClick={() => {
                          handleDelete(category._id,category.cName);
                        }}
                      >
                        Delete Category
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
