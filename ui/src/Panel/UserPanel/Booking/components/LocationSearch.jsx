import { useState, useEffect, useRef } from "react";

function LocationSearch({ label, onSelect }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const wrapperRef = useRef(null);

    // -----------------------------
    // Search Location
    // -----------------------------
    const searchLocation = async (text) => {

        if (text.trim().length < 3) {
            setResults([]);
            setLoading(false);
            setError("");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/api/location/search?q=${encodeURIComponent(text)}`
            );

            if (!response.ok) {
                throw new Error("Unable to fetch locations");
            }

            const data = await response.json();

            setResults(data);
            setSelectedIndex(-1);

        } catch (err) {

            console.error(err);

            setError("Unable to search location");

            setResults([]);

        } finally {

            setLoading(false);

        }

    };

    // -----------------------------
    // Debounce
    // -----------------------------
    useEffect(() => {

        const timer = setTimeout(() => {

            searchLocation(query);

        }, 500);

        return () => clearTimeout(timer);

    }, [query]);

    // -----------------------------
    // Close Suggestions
    // -----------------------------
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setResults([]);
            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    // -----------------------------
    // Keyboard Navigation
    // -----------------------------
    const handleKeyDown = (e) => {

        if (!results.length) return;

        switch (e.key) {

            case "ArrowDown":

                e.preventDefault();

                setSelectedIndex((prev) =>
                    prev < results.length - 1 ? prev + 1 : prev
                );

                break;

            case "ArrowUp":

                e.preventDefault();

                setSelectedIndex((prev) =>
                    prev > 0 ? prev - 1 : 0
                );

                break;

            case "Enter":

                e.preventDefault();

                if (selectedIndex >= 0) {

                    const location = results[selectedIndex];

                    onSelect(location);

                    setQuery(location.display_name);

                    setResults([]);

                }

                break;

            default:
                break;

        }

    };

    return (
        <div
            className="location-search"
            ref={wrapperRef}
        >
            <label>{label}</label>

            <input
                type="text"
                placeholder="Search Address"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {loading && (
                <div className="search-status">
                    Searching...
                </div>
            )}

            {!loading &&
                error && (
                    <div className="search-status error">
                        {error}
                    </div>
                )}

            {!loading &&
                !error &&
                query.length >= 3 &&
                results.length === 0 && (
                    <div className="search-status">
                        No locations found
                    </div>
                )}

            {results.length > 0 && (
                <div className="suggestion-list">

                    {results.map((item, index) => (

                        <div
                            key={item.place_id}
                            className={`suggestion-item ${
                                selectedIndex === index
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() => {

                                onSelect(item);

                                setQuery(item.display_name);

                                setResults([]);

                            }}
                        >
                            {item.display_name}
                        </div>

                    ))}

                </div>
            )}
        </div>
    );
}

export default LocationSearch;

