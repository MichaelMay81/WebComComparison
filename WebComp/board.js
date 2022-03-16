import {Square} from "./square.js";
import {calculateWinner} from "./helper.js"

export class Board extends HTMLElement {
    renderSquare(i) {
        return `
            <Square-World
                value = "${this.squares[i]}"
                handleClick = "this.parentElement.parentElement.parentElement.parentElement.handleClick(${i})">
            </Square-World>`;
    }

    render() {
        const winner = calculateWinner(this.squares);
        const status =
            winner
            ? `Winner: ${winner}`
            : `Next player: ${this.xIsNext ? 'X' : 'O'}`;

        this.innerHTML = `
            <div>
                <div class="status">${status}</div>
                <div class="board-row">
                    ${this.renderSquare(0)}
                    ${this.renderSquare(1)}
                    ${this.renderSquare(2)}
                </div>
                <div class="board-row">
                    ${this.renderSquare(3)}
                    ${this.renderSquare(4)}
                    ${this.renderSquare(5)}
                </div>
                <div class="board-row">
                    ${this.renderSquare(6)}
                    ${this.renderSquare(7)}
                    ${this.renderSquare(8)}
                </div>
            </div>
        `
    }

    handleClick(i) {
        if (calculateWinner(this.squares) || this.squares[i])
            return

        this.squares[i] = this.xIsNext ? "X" : "O";
        this.xIsNext = ! this.xIsNext;
        this.render();
    }
    
    constructor() {
        super();
        this.squares = Array(9).fill("");
        this.xIsNext = true;
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define( 'board-world', Board );