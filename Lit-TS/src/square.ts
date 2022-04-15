import {LitElement, html} from 'lit'
import {customElement, property} from 'lit/decorators.js';
import { squareStyles } from './css';

@customElement('square-world')
export class Square extends LitElement {
    
    @property({type: String})
    value : string = "";

    @property({attribute: false})
    onClick : null | (()=>void) = null;

    static styles = squareStyles
            
    render() {
        return html `
            <button class="square" @click=${this.onClick}>
                ${this.value}
            </button>`
    }
}