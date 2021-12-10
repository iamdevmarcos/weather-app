import styled from "@emotion/styled";

export const Key = styled.span`
    font-family: Consolas !important;
    background-color:#777;
    border-radius: 5px;
    border-bottom: 3px solid #333;
    border-bottom-width:3px;
    font-size: 20px;
    font-weight: bold;
    line-height: normal;
    padding:5px;
    padding-inline: 0.6em;
    white-space: nowrap;
    margin:0px 5px;
    transition: all ease 0.2s;
    color:#FFF;
    &&:hover {
        background-color:#333;
        border-bottom-width:1px;
        cursor:pointer;
    }
`;