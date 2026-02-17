class LottoSet extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['numbers'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'numbers') {
            this.render();
        }
    }

    getColor(number) {
        if (number <= 10) return '#fbc400';
        if (number <= 20) return '#69c8f2';
        if (number <= 30) return '#ff7272';
        if (number <= 40) return '#aaa';
        return '#b0d840';
    }

    render() {
        const numbers = JSON.parse(this.getAttribute('numbers') || '[]');
        this.shadowRoot.innerHTML = `
            <style>
                .lotto-set {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }
                .lotto-ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #fff;
                    background-color: var(--ball-color, #ccc);
                    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.3), 0 2px 5px rgba(0,0,0,0.2);
                }
            </style>
            <div class="lotto-set">
                ${numbers.map(number => `<div class="lotto-ball" style="--ball-color: ${this.getColor(number)}">${number}</div>`).join('')}
            </div>
        `;
    }
}

customElements.define('lotto-set', LottoSet);

document.getElementById('generate-btn').addEventListener('click', () => {
    const container = document.getElementById('lotto-numbers-container');
    container.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const lottoNumbers = generateLottoNumbers();
        const lottoSetElement = document.createElement('lotto-set');
        lottoSetElement.setAttribute('numbers', JSON.stringify(lottoNumbers));
        container.appendChild(lottoSetElement);
    }
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}
