import {LitElement, html} from 'lit'
import {customElement, property} from 'lit/decorators.js';
import {boardStyles} from './css'
import "./square";

@customElement('board-world')
export class Board extends LitElement {

    @property({type: Array})
    squares : ("X"|"O")[] = Array(9).fill("");

    @property({attribute: false})
    onClick? : (i:number)=>void = undefined;

    static styles = boardStyles

    renderSquare(i : number) {
        return html `
            <square-world
                value = "${this.squares[i]}"
                .onClick=${ () => this.onClick ? this.onClick(i) : undefined }>
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