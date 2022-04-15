import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2.2.1/core/lit-core.min.js'
import {boardStyles} from './css.js'
import "./square.js";

export class Board extends LitElement {
    constructor() {
        super();
        this.squares = Array(9).fill("");
        this.onClick = null
    }

    static properties = {
        squares: { type: Array },
        onClick: { attribute: false }
    }

    static styles = boardStyles

    renderSquare(i) {
        return html `
            <square-world
                value = "${this.squares[i]}"
                .onClick=${() => this.onClick(i)}>
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