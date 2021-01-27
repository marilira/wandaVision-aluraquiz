import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    margin-top: 16px;

    background-color: ${({ theme }) => theme.colors.mainBg};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius};

    outline: 0;
    color: #F9F9FF;
    font-size: 14px;
`;

export default function Input({ onChange, placeholder, ...props }) {
    return (
        <div>
            <InputBase 
                placeholder={placeholder}
                onChange={onChange}
                {...props}
            />
        </div>
    );
}

Input.defaultProps = {
    value: '',
};

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};
