import styled from 'styled-components';

const Input = styled.input`
    height: 38px;
    width: 281px;
    left: 1px;
    top: 1px;
    
    background-color: ${({ theme }) => theme.colors.mainBg};
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    border-radius: 0px;
    margin-top: 16px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    color: #F9F9FF;
    font-size: 14px;
`;

export default Input;