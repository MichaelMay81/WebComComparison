import {Board} from "./board.js";
import {calculateWinner} from "./helper.js"

class Game extends HTMLElement {
    constructor() {
        super();
        this.history = [{
            squares: Array(9).fill("")
        }];
        this.xIsNext = true;
    }

    handleClick(i) {
        const current = this.history[this.history.length - 1];

        if (calculateWinner(current.squares) || current.squares[i])
            return

        current.squares[i] = this.xIsNext ? "X" : "O";
        this.xIsNext = ! this.xIsNext;
        this.render();
    }

    // == html rendering ==

    connectedCallback() {
        this.render();
    }

    render() {
        const current = this.history[this.history.length - 1];
        const winner = calculateWinner(current.squares);
        const status =
            winner
            ? `Winner: ${winner}`
            : `Next player: ${this.xIsNext ? 'X' : 'O'}`;

        this.innerHTML = `
            <div class="game">
                <div class="game-board">
                    <Board-World
                        squares=${JSON.stringify(current.squares)}>
                    </Board-World>
                </div>
                <div class="game-info">
                    <div class="status">${status}</div>
                    <ol></ol>
                </div>
            </div>`
        
        const squares = this.getElementsByTagName("Board-World");
        for (let i=0; i<squares.length; i++)
            squares.item(i).handleClick = (i) => this.handleClick(i);
    }
}

customElements.define( 'game-world', Game );