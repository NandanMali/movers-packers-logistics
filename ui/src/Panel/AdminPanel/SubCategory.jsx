import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "../../components/Alert/alert";
import ConfirmModal from "../../components/confirmationBox/ConfirmationBox";
import { apiUrlCategory , apiUrlSubcategory, subcatuploadurl } from "../../apiUrl";
import { useNavigate , useParams } from "react-router-dom";

const AdminSubCategories = () => {
  const [loading, setLoading] = useState(false);
  const [alertData, setAlert] = useState(null);
  const [subCategories, setsubCategories] = useState({
    cName: "",
    file: null,
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const navigate = useNavigate();
  const {catName}=useParams();

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
          error = "Sub Category Name is required";
        }
        break;

      case "file":
        if (!value) {
          error = "Sub Category Icon Image is required";
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

    setsubCategories((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateForm = () => {
    let newErrors = {};

    // Name Validation
    if (!subCategories.cName.trim()) {
      newErrors.cName = "Sub Category Name is required";
    }

    // File Validation
    if (!subCategories.file) {
      newErrors.file = "Sub Category Icon Image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setErrors({});
      setLoading(true);
      setAlert(null);
      const formdata1 = new FormData();
      formdata1.append("cName",catName);
      formdata1.append("cSubName", subCategories.cName);
      formdata1.append("cIcon", subCategories.file);
      axios.post(apiUrlSubcategory + "save", formdata1)
        .then((res) => {
          setAlert({
            message: "Sub Category Added Successful",
            type: "successAlert",
          });
          setsubCatdata((prevsubCatdata) => [...prevsubCatdata, res.data.Added]);
          setsubCategories({ cName: "", file: null });
          setProfilePreview(null);
          setAddcat(false);
        })
        .catch((err) => {
          setAlert({ message: "Sub Category Addition Failed", type: "errorAlert" });
        
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const [search, setSearch] = useState("");
  const [subCatdata, setsubCatdata] = useState([]);
  let count = 0;

  useEffect(() => {
    axios.get(apiUrlSubcategory + "fetch",{
      params:{cName:catName}
    }).then((res) => {
      setsubCatdata(res.data);
    }).catch((err)=>{
      
    });
  }, []);

  const filteredsubCategories = subCatdata.filter((subCategory) =>
    subCategory?.cName?.toLowerCase().includes(search.toLowerCase()),
  );

  /*const handleStatus = async (id, status) => {
    id.preventDefault();
    setAlert(null);

    axios.patch(apiUrlSubCategory+"update", {
        condition_obj: { _id: id },
        content_obj: { status: !status },
      })
      .then((res) => {
        setAlert({ message: "Status Changed", type: "successAlert" });

        setsubCatdata((prevsubCatdata) =>
          prevsubCatdata.map((subCategory) =>
            subCategory._id === id ? { ...subCategory, status: !status } : subCategory,
          ),
        );
      });
  };
*/
  const handleDelete = (id) => {
    setSelectedSubCategoryId(id);
    setConfirmDelete(true);
  };

  const confirmDeleteSubCategory = () => {
    setAlert(null);
    axios
      .delete(apiUrlSubcategory + "delete", {
        data: { condition_obj: { _id: selectedSubCategoryId } },
      })
      .then(() => {
        setAlert({
          message: "Sub Category Deleted Successfully",
          type: "successAlert",
        });

        setsubCatdata((prevsubCatdata) =>
          prevsubCatdata.filter((subCategory) => subCategory._id !== selectedSubCategoryId),
        );
        setConfirmDelete(false);
        setSelectedSubCategoryId(null);
      })
      .catch((err) => {
        setAlert({
          message: "Failed to delete sub category",
          type: "errorAlert",
        });
        setConfirmDelete(false);
        setSelectedSubCategoryId(null);
      });
  };

  const cancelDeleteSubCategory = () => {
    setConfirmDelete(false);
    setSelectedSubCategoryId(null);
  };

  const [addcat, setAddcat] = useState(false);
  // =========================
  // IMAGE PREVIEW
  // =========================


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    setsubCategories((prev) => ({ ...prev, file }));

    validateField("file", file);
    const reader = new FileReader();

    reader.onload = (event) => {
      setProfilePreview(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleAddSubCategory = () => {
    setAddcat(!addcat);
  };

  

  return (
    <>
      <div className="users-page">
        {alertData && <Alert message={alertData.message} type={alertData.type} />}
        <ConfirmModal
          isOpen={confirmDelete}
          title="Confirm Delete"
          message="Are you sure you want to delete this sub category?"
          onConfirm={confirmDeleteSubCategory}
          onCancel={cancelDeleteSubCategory}
        />
        <button className="add-btn" onClick={()=>{navigate("/admin/categories")}}>
            Back
          </button>
          <br/><br/>

        <div className="users-top">
          <div>
            <h1>Sub Category Management</h1>
            <p>Manage all {catName} Categories</p>
          </div>

          <button className="add-btn" onClick={handleAddSubCategory}>
            + Add Sub Category
          </button>
        </div>

        <div className="users-stats">
          <div className="mini-card">
            <h3>{subCatdata.length}</h3>
            <p>Total Sub Categories</p>
          </div>

          <div className="mini-card">
            <h3>3456</h3>
            <p>Avaliable Sub Categories</p>
          </div>

          <div className="mini-card">
            <h3>2345</h3>
            <p>Unavaliable Sub Categories</p>
          </div>
        </div>

        {addcat && (
          <div className="admin-page">
            <div className="page-header">
              <h2> Add Sub Category</h2>
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
                  Add Sub Category Icon
                </label>
                {errors.file && (
                  <span className="error" style={{ color: "red" }}>
                    {errors.file}
                  </span>
                )}
              </div>
              <div className="input-group" style={{ width: "60vh" }}>
                <label>
                  <h4>Sub Category Name</h4>
                </label>

                <input
                  type="text"
                  placeholder="Enter Sub Category Name"
                  name="cName"
                  value={subCategories.cName}
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
                + Add Sub Category
              </button>
            </div>
          </div>
        )}
        <br />

        <div className="admin-page">
          <div className="page-header">
            <h2>Sub Categories List</h2>

            <input
              type="text"
              placeholder="Search sub category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sub Category Icon</th>
                  <th>Sub category Name</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {filteredsubCategories.map((subCategory) => (
                  <tr key={subCategory._id}>
                    <td>{subCategory._id}</td>
                    <td><img src={subcatuploadurl+subCategory.cSubIcon} style={{height:"100px",width:"100px", borderRadius:"50%"}}/></td>
                    <td>{subCategory.cSubName}</td>
                    <td>
                    <button
                        className="edit-btn"
                        onClick={() => {
                          handleDelete(subCategory._id);
                        }}
                      >
                        Delete Sub Category
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

export default AdminSubCategories;
