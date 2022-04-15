import {calculateWinner} from "./helper.js"
import "./board.js";

class Game extends HTMLElement {
    constructor() {
        super();
        this.history = [{
            squares: Array(9).fill("")
        }];
        this.xIsNext = true;
        this.stepNumber = 0;
    }

    handleClick(i) {
        const history = this.history.slice(0, this.stepNumber + 1);
        const current = history[history.length - 1];
        
        if (calculateWinner(current.squares) || current.squares[i])
            return

        const squares = current.squares.slice();
        squares[i] = this.xIsNext ? "X" : "O";

        this.history = history.concat([{
            squares: squares
        }])
        this.xIsNext = ! this.xIsNext;
        this.stepNumber = history.length;

        this.render();
    }

    jumpTo(step) {
        this.stepNumber = step;
        this.xIsNext = (step % 2) === 0;

        this.render();
    }

    // == html rendering ==

    connectedCallback() {
        this.render();
    }

    render() {
        const current = this.history[this.stepNumber];
        const winner = calculateWinner(current.squares);
        const status =
            winner
            ? `Winner: ${winner}`
            : `Next player: ${this.xIsNext ? 'X' : 'O'}`;

        const moves = 
            this
            .history
            .map((step, move) => {
                const desc = move
                    ? 'Go to move #' + move
                    : 'Go to game start';
                return `
                    <li>
                        <button class="history" move=${move}>
                            ${move == this.stepNumber ? "<b>" : ""}
                            ${desc}
                            ${move == this.stepNumber ? "</b>" : ""}
                        </button>
                    </li>`;})
            .join("");

        this.innerHTML = `
            <div class="game">
                <div class="game-board">
                    <Board-World
                        squares=${JSON.stringify(current.squares)}>
                    </Board-World>
                </div>
                <div class="game-info">
                    <div class="status">${status}</div>
                    <ol>${moves}</ol>
                </div>
            </div>`
        
        const squares = this.getElementsByTagName("Board-World");
        for (let i=0; i<squares.length; i++)
            squares.item(i).onMyClick = (i) => this.handleClick(i);

        const buttons = this.getElementsByClassName("history");
        for (let i=0; i<buttons.length; i++)
                buttons.item(i).onclick = () => this.jumpTo(parseInt(buttons.item(i).getAttribute("move")));
    }
}

customElements.define( 'game-world', Game );