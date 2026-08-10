function PriceSummary({

    transportation = 0,

    packing = 0,

    loading = 0,

    unloading = 0,

    insurance = 0,

    other = 0

}) {

    const total =

        Number(transportation) +

        Number(packing) +

        Number(loading) +

        Number(unloading) +

        Number(insurance) +

        Number(other);

    return (

        <div className="price-summary">

            <h3>

                Price Summary

            </h3>

            <div className="price-row">

                <span>

                    Transportation Charge

                </span>

                <strong>

                    ₹ {transportation}

                </strong>

            </div>

            <div className="price-row">

                <span>

                    Packing Charge

                </span>

                <strong>

                    ₹ {packing}

                </strong>

            </div>

            <div className="price-row">

                <span>

                    Loading Charge

                </span>

                <strong>

                    ₹ {loading}

                </strong>

            </div>

            <div className="price-row">

                <span>

                    Unloading Charge

                </span>

                <strong>

                    ₹ {unloading}

                </strong>

            </div>

            <div className="price-row">

                <span>

                    Insurance

                </span>

                <strong>

                    ₹ {insurance}

                </strong>

            </div>

            <div className="price-row">

                <span>

                    Other Charges

                </span>

                <strong>

                    ₹ {other}

                </strong>

            </div>

            <div className="price-divider"></div>

            <div className="price-total">

                <span>

                    Grand Total

                </span>

                <h2>

                    ₹ {total}

                </h2>

            </div>

        </div>

    );

}

export default PriceSummary;