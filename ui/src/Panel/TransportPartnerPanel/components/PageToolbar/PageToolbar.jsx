import "./PageToolbar.css";
import { FaMagnifyingGlass } from "react-icons/fa6";

function PageToolbar({

    search,
    setSearch,

    filter,
    setFilter,

    sort,
    setSort,

    filterOptions = [],

    sortOptions = [],

    total = 0

}) {

    return (

        <div className="page-toolbar">

            <div className="toolbar-search">

                <FaMagnifyingGlass/>

                <input

                    type="text"

                    placeholder="Search..."

                    value={search}

                    onChange={(e)=>

                        setSearch(e.target.value)

                    }

                />

            </div>

            {

                filterOptions.length>0 &&

                <select

                    value={filter}

                    onChange={(e)=>

                        setFilter(e.target.value)

                    }

                >

                    {

                        filterOptions.map((item,index)=>(

                            <option

                                key={index}

                            >

                                {item}

                            </option>

                        ))

                    }

                </select>

            }

            {

                sortOptions.length>0 &&

                <select

                    value={sort}

                    onChange={(e)=>

                        setSort(e.target.value)

                    }

                >

                    {

                        sortOptions.map((item,index)=>(

                            <option

                                key={index}

                            >

                                {item}

                            </option>

                        ))

                    }

                </select>

            }

            <span className="toolbar-count">

                Total : {total}

            </span>

        </div>

    );

}

export default PageToolbar;