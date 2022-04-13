import {LitElement, html, css} from 'lit'
import {customElement, property} from 'lit/decorators.js';

@customElement('square-world')
export class Square extends LitElement {
    
    @property({type: String})
    value : string = "";

    @property({attribute: false})
    handleClick : null | (()=>void) = null;

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