import React from 'react';

const FormInput = ({ name, type, value, handleChange, labelText }) => {
    return (
        <div className='form-floating mb-3'>
            <input
                type={type}
                className='form-control'
                id={name}
                placeholder='name@example.com'
                value={value}
                name={name}
                onChange={handleChange}
            />
            <label htmlFor={name}> {labelText}</label>
        </div>
    );
};

export default FormInput;
