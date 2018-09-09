'use strict';

console.log('+init');

(() => {
    console.log('inside function');

    const tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
        :host {
            all: initial;       /* 1st rule so subsequent properties are reset. */
            display: block;     /* by default, custom elements are display: inline */
            contain: content;   /* CSS containment */

            opacity: 0.4;
            will-change: opacity;
            transition: opacity 300ms ease-in-out;
        }

        :host([hidden]) { 
            display: none 
        }

        :host(:hover) {
            opacity: 1;
        }

        :host([disabled]) { /* style when host has disabled attribute. */
            background: grey;
            pointer-events: none;
            opacity: 0.4;
        }
        :host(.blue) {
            color: blue; /* color host when it has class="blue" */
        }
        :host(.pink) > #tabs {
            color: pink; /* color internal #tabs node when host has class="pink". */
        }

        p { 
            color: var(--fancy-color, green); 
        }
    </style>
    <p><b>I'm in shadow dom!</b></p>
    <slot name="title">
        <p>fallback content</p>
    </slot>
    <slot></slot>
    <slot name="body">
        <div>Hello world!!</div>
    </slot>
`;

    class AppDrawer extends HTMLElement {
        constructor() {
            super();

            // Attach a shadow root to the element.
            console.dir(this.shadowRoot);
            this.attachShadow({mode: 'open'}).appendChild(tmpl.content.cloneNode(true));
            console.dir(this.shadowRoot);

            // Setup a click listener on <app-drawer> itself.
            this.addEventListener('click', e => {
                // Don't toggle the drawer if it's disabled.
                if (this.disabled) {
                    return;
                }
                this.toggleDrawer();
            });
        }

        // Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time.
        connectedCallback() {
            console.log('connectedCallback');
            console.dir(this);
            console.log(this.hasAttribute('open'));
            console.log(this.getAttribute('open'));
        }

        // Called every time the element is removed from the DOM. Useful for running clean up code.
        disconnectedCallback() {
            console.log('disconnectedCallback');
        }

        static get observedAttributes() {
            return ['disabled', 'open'];
        }

        // Called when an observed attribute has been added, removed, updated, or replaced. Also called for initial values when an element is created by the parser, or upgraded. Note: only attributes listed in the observedAttributes property will receive this callback.
        // Only called for the disabled and open attributes due to observedAttributes
        attributeChangedCallback(name, oldValue, newValue) {
            console.log(`attributeChangedCallback, name = ${name}, oldValue = ${oldValue}, newValue = ${newValue}`);
            if (this.disabled) {
                this.setAttribute('tabindex', '-1');
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.setAttribute('tabindex', '0');
                this.setAttribute('aria-disabled', 'false');
            }
            // TODO: also react to the open attribute changing.
        }

        // A getter/setter for an open property.
        get open() {
            return this.hasAttribute('open');
        }

        set open(val) {
            console.log(`set open, value = ${val}`);
            // Reflect the value of the open property as an HTML attribute.
            if (val) {
                this.setAttribute('open', '');
            } else {
                this.removeAttribute('open');
            }
            this.toggleDrawer();
        }

        // A getter/setter for a disabled property.
        get disabled() {
            return this.hasAttribute('disabled');
        }

        set disabled(val) {
            // Reflect the value of the disabled property as an HTML attribute.
            if (val) {
                this.setAttribute('disabled', '');
            } else {
                this.removeAttribute('disabled');
            }
        }

        toggleDrawer() {

        }
    }

    window.customElements.whenDefined('app-drawer').then(() => {
        console.log('app-drawer defined');
        document.querySelector('app-drawer').open = 'false';
    });

    window.customElements.define('app-drawer', AppDrawer);
})();

console.log('-init');
