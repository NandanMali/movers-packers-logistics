import React from "react";
import "../quoteRequests.css";

function QuoteFilters({

    search,
    setSearch,

    status,
    setStatus,

    city,
    setCity,

    service,
    setService

}) {

    return (

        <div className="quote-toolbar">

            <input

                type="text"

                placeholder="Search pickup, drop..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

            />

            <select

                value={status}

                onChange={(e)=>setStatus(e.target.value)}

            >

                <option value="All">

                    All Status

                </option>

                <option value="Waiting">

                    Waiting

                </option>

                <option value="Quoted">

                    Quoted

                </option>

                <option value="Expired">

                    Expired

                </option>

            </select>

            <select

                value={city}

                onChange={(e)=>setCity(e.target.value)}

            >

                <option>

                    All Cities

                </option>

            </select>

            <select

                value={service}

                onChange={(e)=>setService(e.target.value)}

            >

                <option>

                    All Services

                </option>

            </select>

        </div>

    );

}

export default QuoteFilters;