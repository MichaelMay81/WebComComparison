import {LitElement, html, css} from 'lit'
import {customElement} from 'lit/decorators.js';
import {calculateWinner} from "./helper.js"
import "./board.js";

@customElement('game-world')
export class Game extends LitElement {
    history : { squares : ("X"|"O")[] } [] = [{
        squares: Array(9).fill("")
    }];
    xIsNext : boolean = true;
    stepNumber : number = 0;
    
    // callbacks

    handleClick(i:number) {
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

    jumpTo(step : number) {
        this.stepNumber = step;
        this.xIsNext = (step % 2) === 0;

        this.requestUpdate();
    }

    // == html rendering ==
    
    static styles = css `
        ol, ul {
        padding-left: 30px;
      }
      
      .status {
        margin-bottom: 10px;
      }
      
      .game {
        display: flex;
        flex-direction: row;
      }
      
      .game-info {
        margin-left: 20px;
      }
    `

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
            .map((_, move) => {
                var desc = move
                    ? html `Go to move #${move}`
                    : html `Go to game start`;
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
                        squares=${JSON.stringify(current.squares)} .handleClick=${(i:number) => this.handleClick(i)}>
                    </board-world>
                </div>
                <div class="game-info">
                    <div class="status">${status}</div>
                    <ol>${moves}</ol>
                </div>
            </div>`
    }
}