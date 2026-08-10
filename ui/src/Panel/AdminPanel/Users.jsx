import "./admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrlUser } from "../../apiUrl";
import { data } from "react-router-dom";
import Alert from "../../components/Alert/alert";
import AddAll from "../../components/AddAll/AddAll"

const Users = () => {
  const [search, setSearch] = useState("");
  const [users,setUsers]=useState([]);
  const [aleert,setAlert]=useState(null);
  const [add,setAdd]=useState(false);
  let count=0;

  const fetchuser=()=>{ axios.get(apiUrlUser+"fetch",{
    params:{role:"User"}
  }).then((res)=>{
    setUsers(res.data);
    localStorage.setItem("users",res.data.length)
  }).catch(()=>{
    setUsers([]);
  })}
    useEffect(()=>{
      fetchuser();
},[])
  
  const active = users.filter(user => user.status).length;
  const inactive=users.length-active;
  

const filteredUsers=users.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase()))


  
 const handleStatus=async(id,status)=>{
    // id.preventDefault();
    setAlert(null)
    
    axios.patch(apiUrlUser+"update",{"condition_obj":{"_id":id},"content_obj":{"status":!status}}).then((res)=>{
      setAlert({message:"Status Changed",type:"successAlert"})

        setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id
          ? { ...user, status: !status }
          : user
      )
    );

    })


  }

  const handleDelete=(id)=>{
    setAlert(null)
    axios.delete(apiUrlUser+"delete",{data:{condition_obj:{"_id":id}}}).then(()=>{

      setAlert({message:"User Deleted Successfully",type:"successAlert"});
fetchuser();
        setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    }).catch(()=>{
            setAlert({message:"User Deleted Successfully",type:"successAlert"});
fetchuser();
    });;
    }

  const handleback=()=>{
    setAdd(false);
    fetchuser();
  }




  return (
    <div className="users-page">
      {aleert && (<Alert message={aleert.message} type={aleert.type} /> )}

      <div className="users-top">

        <div>
          <h1>Users Management</h1>
          <p>Manage all registered users</p>
        </div>

        <button className="add-btn" onClick={()=>{setAdd(true)}}>
          + Add User
        </button>


      </div>

      <div className="users-stats">

        <div className="mini-card">
          <h3>{users.length}</h3>
          <p>Total Users</p>
        </div>

        <div className="mini-card">
          <h3>{active}</h3>
          <p>Active Users</p>
        </div>

        <div className="mini-card">
          <h3>{inactive}</h3>
          <p>Inactive Users</p>
        </div>

      </div>
      {add && <><button className="add-btn" onClick={()=>{handleback()}}>
            Back
          </button>
          <br/><br/>
        <AddAll AddRole="User"/></>}

      <div className="admin-page">

        <div className="page-header">

          <h2>User List</h2>

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr key={user._id}>

                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>

                  <td>
                    <span
                      className={
                        user.status === true
                          ? "active-badge"
                          : "pending-badge"
                      }
                    >
                      {user.status === true
                          ? "Active"
                          : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <button className="edit-btn" onClick={()=>{handleStatus(user._id,user.status)}}>
                      Change Status
                    </button>

                    <button className="delete-btn" onClick={()=>{handleDelete(user._id)}}>
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Users;