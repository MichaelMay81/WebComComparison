export class Square extends HTMLElement {
    constructor() {
        super();
        this.value = "";
        this.onmyclick = null
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

    set onMyClick(value) {
        this.onmyclick = value;
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
        if (this.onmyclick)
            this
            .getElementsByClassName("square")
            .item(0)
            .onclick = this.onmyclick;
    }
}

customElements.define( 'square-world', Square );