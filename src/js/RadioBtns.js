"use strict"

export default class RadioBtns {
    constructor() {
        this.inputMailContainer = document.getElementById('email-container');
        this.inputMail = document.getElementById('email');

        this.inputPhoneContainer = document.getElementById('phone-number-container');
        this.inputPhone = document.getElementById('phone-number');
    }

    start(contactType) {
        this.inputMailContainer.style.display = (contactType === 'email') ? 'block' : 'none', this.inputMail.value = "";
        this.inputPhoneContainer.style.display = (contactType === 'phone') ? 'block' : 'none', this.inputPhone.value = "";
    }
}