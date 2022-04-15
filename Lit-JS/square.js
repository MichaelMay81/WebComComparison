import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2.2.1/core/lit-core.min.js'
import {squareStyles} from './css.js'

export class Square extends LitElement {
    constructor() {
        super();
        this.value = "";
        this.onClick = null
    }

    static properties = {
        value: { type: String },
        onClick: { attribute: false }
    }
    
    static styles = squareStyles

    render() {
        return html `
            <button class="square" @click=${this.onClick}>
                ${this.value}
            </button>`
    }
}

customElements.define( 'square-world', Square );