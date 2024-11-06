"use strict"

export default class Stars {
    constructor() {
        this.numStars = 100;
        this.body = document.querySelector("#background");

    }

    start() {
        this.createStars();
    }

    createStars() {

        for (let i = 0; i < this.numStars; i++) {

            const star = document.createElement('div');
            star.classList.add('star');

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            star.style.left = `${x}px`;
            star.style.top = `${y}px`;

            const delay = Math.random() * 5;
            star.style.animationDelay = `${delay}s`;

            this.body.appendChild(star);
        }
    }
}