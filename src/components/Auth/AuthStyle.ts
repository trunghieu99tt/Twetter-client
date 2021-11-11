import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const Heading = styled.h3`
    font-size: 2rem;
    text-align: center;
    text-align: center;
    margin-bottom: 1rem;
`;

export const SubHeading = styled.p`
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.2rem;
    color: var(--gray-2);
    
    button{
        font-weight: 500;
        color: var(--blue-2)
    }
    
`;

export const RedirectButton = styled.button``;

export const Form = styled.form``;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    &:not(:last-of-type){
        margin-bottom: 1rem;
    }
`;

export const InputLabel = styled.label`
    font-size: 1.3rem;
    color: var(--gray-1);
`;

export const Input = styled.input`
    padding: 1rem;
    border-radius: 0.5rem;
    outline: var(--border-1);
    border: none;
    
    &:focus{
        outline: 2px solid var(--blue-1);
    }
`;

export const Selected = styled.div``;

export const Hr = styled.p`
    display: block;
    text-align: center;
    margin: 1rem 0;
    font-size: 1.4rem;
    position: relative;
    
    span {
        background: #fff;
        padding: 0.5rem;
        display: inline-block;
        z-index: 1;
        position: relative;
    }
    
    &::before{
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #000;
    }
    
`;

export const SocialSuggest = styled.p`
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: 500;
    color: var(--green-2);
`;

export const SubmitButton = styled.button`
    display: block;
    margin-top: 1.5rem;
    text-align: center;
    width: 100%;
    background: var(--blue-1);
    color: #fff;
    font-weight: 500;
    padding: 1rem;
    border-radius: 5px;
`;

export const ForgotPasswordStyled = styled.button`
    text-align: center;
    margin: 0rem auto;
    display: block;
    color: var(--red);
    margin-top: 1rem;
`;