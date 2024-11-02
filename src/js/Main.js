"use strict"

import Stars from "./Stars.js";
import TypingText from "./TypingText.js";
import RadioBtns from "./RadioBtns.js";



const stars = new Stars;
stars.start();

const typingText = new TypingText;
typingText.start();

function showInput(contactType) {
    const radioBtns = new RadioBtns;
    radioBtns.start(contactType);
};
window.showInput = showInput; /*Im HTML verfügbar machen*/
