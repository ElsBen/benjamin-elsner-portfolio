"use strict"

import Stars from "./Stars.js";
import TypingText from "./TypingText.js";
import Form from "./Form.js";
import RadioBtns from "./RadioBtns.js";

const stars = new Stars;
stars.start();

const typingText = new TypingText;
typingText.start();

const form = new Form;
form.start();

export function showInput(contactChoice) {
    const radioBtns = new RadioBtns;
    radioBtns.start(contactChoice);
};

window.showInput = showInput; /*showInput im HTML verfügbar machen*/
