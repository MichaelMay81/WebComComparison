import {css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2.2.1/core/lit-core.min.js'

export const tictactoeStyles = css `
    ol, ul { padding-left: 30px; }
    .status { margin-bottom: 10px; }
    .game {
        display: flex;
        flex-direction: row; }
    .game-info { margin-left: 20px; }`

export const boardStyles = css `
    .board-row:after {
        clear: both;
        content: "";
        display: table; }`

export const squareStyles = css `
    .square {
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 34px; }
    .square:focus { outline: none; }`