import "./paymentCards.css";

function PaymentMethods({

    paymentMethod,

    setPaymentMethod

}) {

    return (

        <div className="payment-card">

            <h3>

                Payment Method

            </h3>

            <label className="payment-option">

                <input

                    type="radio"

                    checked={paymentMethod==="UPI"}

                    onChange={()=>

                        setPaymentMethod("UPI")

                    }

                />

                UPI

            </label>

            <label className="payment-option">

                <input

                    type="radio"

                    checked={paymentMethod==="Card"}

                    onChange={()=>

                        setPaymentMethod("Card")

                    }

                />

                Debit / Credit Card

            </label>

            <label className="payment-option">

                <input

                    type="radio"

                    checked={paymentMethod==="Net Banking"}

                    onChange={()=>

                        setPaymentMethod("Net Banking")

                    }

                />

                Net Banking

            </label>

            <label className="payment-option">

                <input

                    type="radio"

                    checked={paymentMethod==="Cash"}

                    onChange={()=>

                        setPaymentMethod("Cash")

                    }

                />

                Cash On Service

            </label>

        </div>

    );

}

export default PaymentMethods;