export class Square extends HTMLElement {
    constructor() {
        super();
        this.value = "";
        this.handleclick = null
    }

    // == html attributes ==

    static get observedAttributes() {
        return ['value'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;

        this[ property ] = newValue;
        this.render();
    }

    // == class properties ==

    set handleClick(value) {
        this.handleclick = value;
        this.render();
    }

    // == html rendering ==

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <button class="square">
                ${this.value}
            </button>
        `
        if (this.handleclick)
            this
            .getElementsByClassName("square")
            .item(0)
            .onclick = this.handleclick;
    }
}

customElements.define( 'square-world', Square );