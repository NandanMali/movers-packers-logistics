import "./FormInput.css";

function FormInput({

    label,

    type = "text",

    name,

    value,

    onChange,

    placeholder,

    required = false,

    disabled = false,

    options = [],

    rows = 4

}) {

    return (

        <div className="form-group">

            {
                label &&

                <label>

                    {label}

                </label>
            }

            {
                type === "select" ? (

                    <select

                        name={name}

                        value={value}

                        onChange={onChange}

                        required={required}

                        disabled={disabled}

                    >

                        {

                            options.map((item,index)=>(

                                <option

                                    key={index}

                                    value={item.value ?? item}

                                >

                                    {item.label ?? item}

                                </option>

                            ))

                        }

                    </select>

                )

                :

                type==="textarea" ? (

                    <textarea

                        rows={rows}

                        name={name}

                        value={value}

                        onChange={onChange}

                        placeholder={placeholder}

                        required={required}

                        disabled={disabled}

                    />

                )

                :

                (

                    <input

                        type={type}

                        name={name}

                        value={value}

                        onChange={onChange}

                        placeholder={placeholder}

                        required={required}

                        disabled={disabled}

                    />

                )

            }

        </div>

    );

}

export default FormInput;