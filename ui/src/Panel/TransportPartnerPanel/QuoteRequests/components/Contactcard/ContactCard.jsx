import "./contactCard.css";

function ContactCard({

    title = "Contact Information",

    name = "",

    phone = "",

    email = "",

    address = "",

    showContact = false

}) {


    const hideName = (value) => {

        if (!value) return "Hidden";

        const words = value.split(" ");

        return words

            .map(word =>

                word.length > 1

                    ? word[0] + "*".repeat(word.length - 1)

                    : word

            )

            .join(" ");

    };

    const hidePhone = (value) => {

        if (!value) return "Hidden";

        return "******" + value.slice(-4);

    };

    return (

        <div className="contact-card">

            <h3>

                {title}

            </h3>

            <div className="contact-row">

                <span>

                    Name

                </span>

                <strong>

                    {

                        showContact

                            ? name

                            : hideName(name)

                    }

                </strong>

            </div>

            <div className="contact-row">

                <span>

                    Mobile

                </span>

                <strong>

                    {

                        showContact

                            ? phone

                            : hidePhone(phone)

                    }

                </strong>

            </div>

            <div className="contact-row">

                <span>

                    Email

                </span>

                <strong>

                    {

                        showContact

                            ? email

                            : "Hidden"

                    }

                </strong>

            </div>

            <div className="contact-row">

                <span>

                    Address

                </span>

                <strong>

                    {

                        showContact

                            ? address

                            : "Available after booking confirmation."

                    }

                </strong>

            </div>

        </div>

    );

}

export default ContactCard;