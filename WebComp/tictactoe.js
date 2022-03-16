import {Board} from "./board.js";

class Game extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="game">
                <div class="game-board">
                    <Board-World />
                </div>
                <div class="game-info">
                    <div></div>
                    <ol></ol>
                </div>
            </div>
        `
    }
}

customElements.define( 'game-world', Game );