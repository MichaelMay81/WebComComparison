import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2.2.1/core/lit-core.min.js'
import {Square} from "./square.js";

export class Board extends LitElement {
    constructor() {
        super();
        this.squares = Array(9).fill("");
        this.handleClick = null
    }

    // == class properties / html attributes ==

    static properties = {
        squares: { type: Array },
        handleClick: { }
    }

    // == html rendering ==
    
    static styles = css `
        .board-row:after {
            clear: both;
            content: "";
            display: table;
        }
    `

    renderSquare(i) {
        return html `
            <square-world
                value = "${this.squares[i]}" .handleClick=${() => this.handleClick(i)}>
            </square-world>`;
    }

    render() {
        return html `
            <div>
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
}

customElements.define( 'board-world', Board );