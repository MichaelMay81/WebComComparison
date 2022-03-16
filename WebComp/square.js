export class Square extends HTMLElement {
    constructor() {
        super();
        this.value = "";
        this.handleclick = null
    }

    static get observedAttributes() {
        return ['value', 'handleclick'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        this[ property ] = newValue;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <button class="square" onclick="${this.handleclick}">
                ${this.value}
            </button>
        `
    }
}

customElements.define( 'square-world', Square );