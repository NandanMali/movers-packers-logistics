import "../admin.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrlPartnerProfile, apiUrlUser } from "../../../apiUrl";
import { data } from "react-router-dom";
import Alert from "../../../components/Alert/alert";
import AddAll from "../../../components/AddAll/AddAll"
import PartnerCard from "./PartnerCard";

const Partners = () => {
  const [search, setSearch] = useState("");
  const [partners,setpartners]=useState([]);
  const [aleert,setAlert]=useState(null);
  const [add,setAdd]=useState(false);
  let count=0;
  const fetchpartner= async ()=>{
    await axios.get(apiUrlUser+"fetch",{
    params:{role:"Transport Partner"}
  }).then((res)=>{
    setpartners(res.data);
  }).catch(()=>{
      setpartners([]);
    })
   } 

   useEffect(()=>{
    fetchpartner();
},[])
  
  const active = partners.filter(partner => partner.status).length;
  const inactive=partners.length-active;
  

const filteredpartners=partners.filter((partner)=>partner.name.toLowerCase().includes(search.toLowerCase()))


  
 const handleStatus=async(id,status)=>{
    // id.preventDefault();
    setAlert(null)
    
    axios.patch(apiUrlUser+"update",{"condition_obj":{"_id":id},"content_obj":{"status":!status}}).then((res)=>{
      setAlert({message:"Status Changed",type:"successAlert"})

        setpartners((prevpartners) =>
      prevpartners.map((partner) =>
        partner._id === id
          ? { ...partner, status: !status }
          : partner
      )
    );

    })


  }

  const handleDelete=(id)=>{
    setAlert(null)
    axios.delete(apiUrlUser+"delete",{data:{condition_obj:{"_id":id}}}).then(()=>{

      setAlert({message:"Partner Deleted Successfully",type:"successAlert"});

        setpartners((prevpartners) =>
        prevpartners.filter((partner) => partner._id !== id)
      );
    }).catch(()=>{
            setAlert({message:"Partner Deleted Successfully",type:"successAlert"});
fetchpartner();
    });
    }

  const handleback=()=>{
    setAdd(false);
    fetchpartner();
  }


  return (
    <div className="users-page">
      {aleert && (<Alert message={aleert.message} type={aleert.type} /> )}

      <div className="users-top">

        <div>
          <h1>Partners Management</h1>
          <p>Manage all registered partners</p>
        </div>

        <button className="add-btn" onClick={()=>{setAdd(true)}}>
          + Add Partner
        </button>


      </div>

      <div className="users-stats">

        <div className="mini-card">
          <h3>{partners.length}</h3>
          <p>Total Partners</p>
        </div>

        <div className="mini-card">
          <h3>{active}</h3>
          <p>Active Partners</p>
        </div>

        <div className="mini-card">
          <h3>{inactive}</h3>
          <p>Inactive Partners</p>
        </div>

      </div>
      {add && <><button className="add-btn" onClick={()=>{handleback()}}>
            Back
          </button>
          <br/><br/>
        <AddAll AddRole="Transport Partner"/></>}

      <div className="admin-page">

        <div className="page-header">

          <h2>Partner List</h2>

          <input
            type="text"
            placeholder="Search partner..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


          <div className="driver-grid" >
                          {filteredpartners.map((partner) => (
              <PartnerCard 
              partner={partner}
              refresh={fetchpartner}
              status={()=>{ handleStatus(partner._id,partner.status)}}
              deletePartner={()=>{handleDelete(partner._id)}}
              />
               ))}
</div>

      </div>

    </div>
  );
};

export default Partners;