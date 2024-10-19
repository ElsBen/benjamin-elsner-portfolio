"use strict"

export default class TypingText {

    constructor() {
        this.textArray = [
            "ein Junior Webentwickler mit einer Leidenschaft für kreative Lösungen, sauberen Code und neue Technologien.",
            "Als Quereinsteiger habe ich neben meinem Hauptberuf verschiedene Kurse in HTML, CSS, JavaScript, TypeScript, Angular und Node.js absolviert.",
            "Diese Erfahrung hat mir nicht nur solide Grundlagen, sondern auch die Fähigkeit gegeben, mich schnell in neue Technologien einzuarbeiten.",
            "Durch eigene Projekte konnte ich mein Wissen weiter vertiefen und praktische Programmiererfahrung sammeln.",
            "Mit diesen Erfahrungen fühle ich mich bestens vorbereitet, meine Fähigkeiten als Junior Webentwickler in die Praxis umzusetzen",
            "und aktiv zur Entwicklung innovativer Weblösungen beizutragen."
        ];

        this.typingAnimationElement = document.getElementById("typing-animation");
        this.textIndex = 0;
        this.charIndex = 0;
        this.delayBetweenWords = 70;
        this.delayBetweenLines = 1100;
    }

    start() {
        this.createParagraphAndInsert();
    }

    createParagraphAndInsert() {
        let newParagraph = document.createElement("p");
        this.typingAnimationElement.insertAdjacentElement('beforeend', newParagraph);
        if (this.charIndex > 0) {
            this.typeLine()
        } else {
            this.typeLine();
        }
    }

    typeLine() {

        if (this.textIndex < this.textArray.length) {
            let currentText = this.textArray[this.textIndex];

            this.typingAnimationElement.lastElementChild.innerHTML = currentText.slice(0, this.charIndex) + '<span class="caret">|</span>';
            this.charIndex++;

            if (this.charIndex > currentText.length) {
                this.textIndex++;
                this.charIndex = 0;
                let caret = document.getElementsByClassName('caret');

                setTimeout(() => {
                    this.typingAnimationElement.lastElementChild.removeChild(caret[0]);
                    this.createParagraphAndInsert();
                },
                    this.delayBetweenLines
                );
            } else {
                setTimeout(this.typeLine.bind(this), this.delayBetweenWords);
            }
        }
    }

}