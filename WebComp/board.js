import {Square} from "./square.js";
import {calculateWinner} from "./helper.js"

export class Board extends HTMLElement {
    renderSquare(i) {
        return `
            <Square-World
                value = "${this.squares[i]}">
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
        const squares = this.getElementsByTagName("Square-World");
        for (let i=0; i<squares.length; i++)
            squares.item(i).handleClick = () => this.handleClick(i); // console.log(this.tagName);
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