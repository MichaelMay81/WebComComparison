import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2.2.1/core/lit-core.min.js'

export class Square extends LitElement {
    constructor() {
        super();
        this.value = "";
        this.handleClick = null
    }

    // == class properties / html attributes ==

    static properties = {
        value: { type: String },
        handleClick: { }
    }

    // == html rendering ==
    
    static styles = css `
        .square {
            background: #fff;
            border: 1px solid #999;
            float: left;
            font-size: 24px;
            font-weight: bold;
            line-height: 34px;
            height: 34px;
            margin-right: -1px;
            margin-top: -1px;
            padding: 0;
            text-align: center;
            width: 34px; }
      
        .square:focus {
            outline: none;
            background: #ddd; }`
            
    render() {
        return html `
            <button class="square" @click=${this.handleClick}>
                ${this.value}
            </button>`
    }
}

customElements.define( 'square-world', Square );