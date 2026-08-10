import { useState, useEffect } from "react";
import axios from "axios";
import "../QuoteRequests/quoteRequests.css";
import { apiUrlBookingQuote } from "../../../apiUrl.js";
import QuoteStatistics from "../QuoteRequests/components/QuoteStatistics.jsx";
import StatusBadge from "../../../components/SatutsBadge/Statusbadge.jsx";
import PageToolbar from "../components/PageToolbar/PageToolbar.jsx";

function QuoteStatus() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [sort, setSort] = useState("Newest");


    useEffect(() => {

    getQuotes();

}, []);

const getQuotes = async () => {
    const partnerId=parseInt(localStorage.getItem("_id"));

    const response = await axios.get(apiUrlBookingQuote+`fetch/${partnerId}`);


    setRequests(response.data.quote);

};
    if(loading){

    return(

        <h2>

            Loading...

        </h2>

    );

}
  const filteredrequests = requests.filter((quote) => {
    const matchSearch = 
    String(quote.bookingId).toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || quote.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const sortedrequests = [...filteredrequests];

  switch (sort) {
    case "Newest":
      sortedrequests.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      break;

    case "Oldest":
      sortedrequests.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      break;

    default:
      break;
  }


    return (

        <div className="quote-page">

            {/* Header */}
            <div className="page-header">

    <div>

        <h2>

            Quote Status

        </h2>

        <p>

            View Your Quote Status.

        </p>

    </div>

</div>


<QuoteStatistics

    waiting={requests.filter((request)=> request.status==="Pending").length}

    quoted={requests.length}

    accepted={requests.filter((request)=> request.status==="Accepted").length}

    rejected={requests.filter((request)=> request.status==="Rejected").length}

/>

<PageToolbar
        search={search}
        setSearch={setSearch}
        filter={statusFilter}
        setFilter={setStatusFilter}
        sort={sort}
        setSort={setSort}
        filterOptions={[
          "All",
          "Pending",
          "Accepted",
          "Rejected"
        ]}
        sortOptions={["Newest", "Oldest"]}
        total={sortedrequests.length}
      />


            {/* Cards */}
    { filteredrequests.length !== 0 ?(
            <div className="quote-grid">

        {filteredrequests.map((quote)=>(

             <div className="quote-card">
            
                        {/* Header */}
            
                        <div className="quote-card-header">
            
                            <div>
            
                                <h3>
            
                                    Booking #{quote.bookingId}
            
                                </h3>
                                    <StatusBadge status={quote.status} />
            
                                
                            </div>
            
                        </div>
    
                            <div>

                                <p>
            
                                    Estimated Budget
            
                                </p>
            
                                <h3>
            
                                    ₹ {quote.estimatedPrice}
            
                                </h3>
                                 <p>
            
                                    Estimated days
            
                                </p>
            
                                <h3>
            
                                    {quote.estimatedDays}
            
                                </h3>

                                 <p>
            
                                    Vehicle Type
            
                                </p>
            
                                <h3>
            
                                    {quote.vehicleType}
            
                                </h3>

                                 <p>
            
                                    Message
            
                                </p>
            
                                <h3>
            
                                    {quote.message? quote.message : "No Message Given"}
            
                                </h3>

                                
            
                            </div>
            
                    </div>
        ))}
            
</div>

        ):(
            <div className="empty-state" >
            🚚
            <h3>No Quotes Found</h3>
            <p>Go to Quote Requests and make your first Quote.</p>
          </div>
        )}

    


        </div>

    );

}

export default QuoteStatus;