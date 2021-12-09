import styled from "@emotion/styled";

export const Container = styled.div`
    min-height:100vh;
    box-sizing:border-box;
    margin:0;
    padding:0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #333;
    font-family: Arial, Helvetica, sans-serif;

    h1 {
        color:#FFF;
        margin:20px 0px;
    }

    .search {
        display:flex;
        width:300px;

        input {
            flex:1;
            padding:10px;
            outline:0;
            font-size:15px;
            border-radius:5px;
            border:0;
        }

        button {
            padding: 10px;
            font-size: 15px;
            border: 0;
            background-color: #555;
            color: #FFF;
            border-radius: 5px;
            margin-left: 10px;
            cursor: pointer;

            &&:hover {
                background-color: #444;
            }
        }

    }

`;