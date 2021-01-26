import styled from 'styled-components';

const Button = styled.button`
    height: 36px;
    width: 283px;
    left: 0x;
    top: 0px;

    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.secondary};

    color: ${({ theme }) => theme.colors.contrastText};
    font-weight: 700;
    font-size: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Button;
