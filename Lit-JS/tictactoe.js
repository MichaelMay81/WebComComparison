import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2.2.1/core/lit-core.min.js'
import {calculateWinner} from "./helper.js"
import { tictactoeStyles } from './css.js';
import "./board.js";

export class Game extends LitElement {
    constructor() {
        super();
        this.history = [{
            squares: Array(9).fill("")
        }];
        this.xIsNext = true;
        this.stepNumber = 0;
    }

    // callbacks

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

        this.requestUpdate();
    }

    jumpTo(step) {
        this.stepNumber = step;
        this.xIsNext = (step % 2) === 0;

        this.requestUpdate();
    }

    // == html rendering ==
    
    static styles = tictactoeStyles

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
                var desc = move
                    ? 'Go to move #' + move
                    : 'Go to game start';
                desc = move == this.stepNumber
                    ? html `<b>${desc}</b>`
                    : desc
                return html `
                    <li>
                        <button class="history" @click=${() => this.jumpTo(move)}>
                            ${desc}
                        </button>
                    </li>`;})

        return html `
            <div class="game">
                <div class="game-board">
                    <board-world
                        squares=${JSON.stringify(current.squares)} .onClick=${(i) => this.handleClick(i)}>
                    </board-world>
                </div>
                <div class="game-info">
                    <div class="status">${status}</div>
                    <ol>${moves}</ol>
                </div>
            </div>`
    }
}

customElements.define( 'game-world', Game );