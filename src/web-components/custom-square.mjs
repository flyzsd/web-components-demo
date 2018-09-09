'use strict';

console.log('+init custom-square');

(() => {
    console.log('inside custom-square function');

    const template = document.createElement('template');
    template.innerHTML = `
    <style>
        :host {
            all: initial;       /* 1st rule so subsequent properties are reset. */
            display: block;     /* by default, custom elements are display: inline */
            contain: content;   /* CSS containment */
        }

        :host([hidden]) { 
            display: none 
        }
    </style>
    <div></div>
`;

    class CustomSquare extends HTMLElement {
        constructor() {
            console.log('constructor');
            super();
            // Attach a shadow root to the element.
            this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
        }

        // Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time.
        connectedCallback() {
            console.log('connectedCallback');
            console.dir(this);
            this.render();
        }

        // Called every time the element is removed from the DOM. Useful for running clean up code.
        disconnectedCallback() {
            console.log('disconnectedCallback');
        }

        static get observedAttributes() {
            return ['size', 'color'];
        }

        // Called when an observed attribute has been added, removed, updated, or replaced. Also called for initial values when an element is created by the parser, or upgraded. Note: only attributes listed in the observedAttributes property will receive this callback.
        // Only called for the disabled and open attributes due to observedAttributes
        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`attributeChangedCallback, name = ${name}, oldValue = ${oldValue}, newValue = ${newValue}`);
            this.render();
        }

        // A getter/setter for an size property.
        get size() {
            if(this.hasAttribute('size')) {
                return +this.getAttribute('size');
            } else {
                return 100;
            }
        }

        set size(value) {
            console.log(`set size, value = ${value}`);
            // Reflect the value of the size property as an HTML attribute.
            if (Number.isNaN(value)) {
                this.removeAttribute('size');
            } else {
                this.setAttribute('size', value);
            }
        }

        // A getter/setter for a color property.
        get color() {
            if(this.hasAttribute('color')) {
                return this.getAttribute('color');
            } else {
                return 'red';
            }
        }

        set color(value) {
            // Reflect the value of the color property as an HTML attribute.
            if (value) {
                this.setAttribute('color', value);
            } else {
                this.removeAttribute('color');
            }
        }

        render() {
            console.log(`render size = ${this.size}, color = ${this.color}`);
            const element = this.shadowRoot.querySelector('div');
            element.style.width = `${this.size}px`;
            element.style.height = `${this.size}px`;
            element.style.backgroundColor = this.color;
        }
    }

    window.customElements.whenDefined('custom-square').then(() => {
        console.log('custom-square defined');
    });

    window.customElements.define('custom-square', CustomSquare);
})();


const ready = () => {
    console.log('DOM is ready');

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    let square = document.querySelector('custom-square');

    document.querySelector('#btn-add').addEventListener('click', evt => {
        if(!square) {
            square = document.createElement('custom-square');
            square.color = 'blue';
        }
        document.body.appendChild(square);

        document.querySelector('#btn-add').disabled = true;
        document.querySelector('#btn-update-attribute').disabled = false;
        document.querySelector('#btn-update-property').disabled = false;
        document.querySelector('#btn-remove').disabled = false;
    });

    document.querySelector('#btn-update-attribute').addEventListener('click', evt => {
        const square = document.querySelector('custom-square');
        square.setAttribute('size', random(50, 200));
        square.setAttribute('color', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
    });

    document.querySelector('#btn-update-property').addEventListener('click', evt => {
        const square = document.querySelector('custom-square');
        square.size = random(50, 200);
        square.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    });

    document.querySelector('#btn-remove').addEventListener('click', evt => {
        const square = document.querySelector('custom-square');
        document.body.removeChild(square);

        document.querySelector('#btn-add').disabled = false;
        document.querySelector('#btn-update-attribute').disabled = true;
        document.querySelector('#btn-update-property').disabled = true;
        document.querySelector('#btn-remove').disabled = true;
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {  // `DOMContentLoaded` already fired
    ready();
}

console.log('-init custom-square');