"use strict"

export default class TypingText {

    constructor() {
        this.textArray = [
            "ein Junior Webentwickler mit einer Leidenschaft für kreative Lösungen,",
            "sauberen Code und neue Technologien.",
            "Als Quereinsteiger habe ich neben meinem Hauptberuf verschiedene Kurse in HTML,",
            "CSS, JavaScript, TypeScript, Angular und Node.js absolviert.",
            "Diese Erfahrung hat mir nicht nur solide Grundlagen,",
            "sondern auch die Fähigkeit gegeben, mich schnell in neue Technologien einzuarbeiten.",
            "Durch eigene Projekte konnte ich mein Wissen",
            "weiter vertiefen und praktische Programmiererfahrung sammeln.",
            "Mit diesen Erfahrungen fühle ich mich bestens vorbereitet,",
            "meine Fähigkeiten als Junior Webentwickler in die Praxis umzusetzen",
            "und aktiv zur Entwicklung innovativer Weblösungen beizutragen."
        ];

        this.typingAnimationElement = document.getElementById("typing-animation");
        this.cursorBuild = '<span class="cursor">|</span>';
        this.paragraphs = document.querySelectorAll('#typing-animation > p');
        this.cursor = document.getElementsByClassName('cursor');
        this.textIndex = 0;
        this.charIndex = 0;
        this.delayBetweenWords = 50;
        this.delayBetweenLines = 1100;
    }

    start() {
        this.createParagraphAndInsert();
    }

    createParagraphAndInsert() {
        // let newParagraph = document.createElement("p");
        // this.typingAnimationElement.insertAdjacentElement('beforeend', newParagraph);
        if (this.charIndex > 0) {
            this.typeLine();
        } else if (this.textIndex === 0) {
            // this.typingAnimationElement.lastElementChild.innerHTML = this.cursorBuild;
            this.paragraphs[this.textIndex].innerHTML = this.cursorBuild;
            this.delayStart(this.typeLine.bind(this), this.delayBetweenLines * 2);
        } else {
            this.typeLine();
        }
    }

    delayStart(delayedFunction, delay) {
        setTimeout(() => {
            // this.typingAnimationElement.lastElementChild.removeChild(this.cursor[0]);
            // this.paragraphs[this.textIndex].removeChild(this.cursor[0]);
            this.cursor[0].remove();
            delayedFunction();
        },
            delay
        );
    }

    typeLine() {
        if (this.textIndex < this.textArray.length) {
            let currentText = this.textArray[this.textIndex];
            // this.typingAnimationElement.lastElementChild.innerHTML = currentText.slice(0, this.charIndex) + this.cursorBuild;
            this.paragraphs[this.textIndex].innerHTML = currentText.slice(0, this.charIndex) + this.cursorBuild;
            this.charIndex++;

            if (this.charIndex > currentText.length) {
                this.textIndex++;
                this.charIndex = 0;
                this.delayStart(this.createParagraphAndInsert.bind(this), this.delayBetweenLines);
            } else {
                setTimeout(this.typeLine.bind(this), this.delayBetweenWords);
            }
        }
    }
}