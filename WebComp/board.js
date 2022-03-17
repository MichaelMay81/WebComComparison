import {Square} from "./square.js";

export class Board extends HTMLElement {
    constructor() {
        super();
        this.squares = Array(9).fill("");
        this.handleclick = null
    }

    // == html attributes ==

    static get observedAttributes() {
        return ['squares'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;

        if (property == "squares") {
            this[ property ] = JSON.parse(newValue);
            this.render();
        }
    }

    // == class properties ==

    set handleClick(value) {
        this.handleclick = value;
        this.render();
    }

    // == html rendering ==

    renderSquare(i) {
        return `
            <Square-World
                value = "${this.squares[i]}">
            </Square-World>`;
    }

    render() {
        this.innerHTML = `
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
        const squares = this.getElementsByTagName("Square-World");
        for (let i=0; i<squares.length; i++)
            squares.item(i).handleClick = () => this.handleclick(i);
    }

    connectedCallback() {
        this.render();
    }
}

customElements.define( 'board-world', Board );