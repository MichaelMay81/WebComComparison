import {LitElement, html, css} from 'lit'
import {customElement, property} from 'lit/decorators.js';
import "./square.js";

@customElement('board-world')
export class Board extends LitElement {

    @property({type: Array})
    squares : ("X"|"O")[] = Array(9).fill("");

    @property({attribute: false})
    handleClick? : (i:number)=>void = undefined;

    // == html rendering ==
    
    static styles = css `
        .board-row:after {
            clear: both;
            content: "";
            display: table;
        }
    `

    renderSquare(i : number) {
        return html `
            <square-world
                value = "${this.squares[i]}" .handleClick=${ () => this.handleClick ? this.handleClick(i) : undefined }>
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