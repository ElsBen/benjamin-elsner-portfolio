"use strict"

export default class RadioBtns {
    constructor() {
        this.inputMail = document.getElementById('email-container');
        this.inputPhone = document.getElementById('phone-number-container');
    }

    start(contactType) {
        this.inputMail.style.display = (contactType === 'email') ? 'block' : 'none';
        this.inputPhone.style.display = (contactType === 'phone') ? 'block' : 'none';
    }
}