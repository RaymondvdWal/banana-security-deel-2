

function InputField({id, type, register, name, validation, children, errors}) {


    return (
        <>
            <label htmlFor={id}>
                {children}
                <input
                    type={type}
                    id={id}
                    {...register(name, validation)}
                />
            </label>

            {errors[name] && <p>{errors[name].message}</p>}

        </>
    );
}

export default InputField;