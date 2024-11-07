"use strict"

export default class Form {
    constructor() {
        this.form = document.querySelector('#form');
        this.userInputSend = document.querySelector('.sended-user-input-container');
        this.userInputSendContent = document.querySelector('.sended-user-input');
        this.validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.validPhoneNumber = /^(\+?\d{1,3})?[-.\s]?(\(?\d{2,5}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

        this.saveEntr;
        this.userEntries = [];

        this.savedInquiry =
            JSON.parse(localStorage.getItem('saveInquiry')) || [];

        this.savedPerformanceSelection =
            JSON.parse(localStorage.getItem('savePerformanceSelection')) || [];

        localStorage.removeItem('savePerformanceSelection');

        if (this.form) {
            this.headlineInputSend = this.userInputSendContent.querySelector('h2');
            this.paragraphInputSend = this.userInputSendContent.querySelector('p');
            this.colorAlert = '#ff7f50';
            this.colorSuccess = 'var(--font-color)';
            this.userInputSendBtn = document.querySelector(
                '.user-input-sended-btn'
            );
            this.userInputCancelBtn = document.querySelector('.hide-no-btn');
        } else { console.log('Form does not exist!') }
    }

    start() {
        if (this.savedInquiry && this.savedInquiry.length >= 0) {
            this.userEntries = this.savedInquiry;
        }

        if (this.form) {
            this.getUserInfoBtn();
            this.getInputValuesAndBuildObject();
        }
    }

    getUserInfoBtn() {
        this.userInputSendContent.addEventListener('click', (e) => {

            if (e.target.innerHTML.match('Ja')) {
                setTimeout(() => {
                    this.userInputCancelBtn.style.display = 'none';
                    this.saveUserEntries(this.saveEntr);
                }, 1000)
            } else if (e.target.innerHTML.match('Nein')) {
                this.userInputCancelBtn.style.display = 'none';
                this.validatAndBuildSendStateWindow(false);
            } else if (e.target.innerHTML.match('Schließen')) {
                this.userInputSend.style.display = 'none';
            }
        });
    }

    getInputValuesAndBuildObject() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formName = document.querySelector('#name').value;
            const formCompanyName = document.querySelector('#company-name').value;
            const formEMail = document.querySelector(`#email`).value;
            const formTelNumber = document.querySelector('#phone-number').value;
            const formMessage = document.querySelector('#message').value;
            let contactValue;

            (formEMail) ? contactValue = formEMail : contactValue = formTelNumber;

            const saveEntries = {
                name: formName,
                company: formCompanyName,
                contact: contactValue,
                message: formMessage
            };

            this.userInputCancelBtn.style.display = 'inline-block';
            this.checkEntriesValid(saveEntries);
        });
    }

    checkEntriesValid(checkEntries) {
        if (checkEntries.contact.match(this.validEmail) || checkEntries.contact.match(this.validPhoneNumber)) {
            this.areTheEntriesCorrectWindow(checkEntries);
        } else {
            this.userInputCancelBtn.style.display = 'none';
            this.validatAndBuildSendStateWindow('mail-or-number-unvalid');
        }
    }

    areTheEntriesCorrectWindow(entries) {
        const name = `Name:     ${entries.name}`;
        const companyName = `Firma:     ${entries.company}`;
        const contactValue = `Kontakt:  ${entries.contact}`;
        const message = `Nachricht:${entries.message}`;

        const formattedEntries = [name, companyName, contactValue, message];

        this.validatAndBuildSendStateWindow(formattedEntries, entries);
    }

    saveUserEntries(saveEntries) {
        this.userEntries.push(saveEntries);
        localStorage.setItem('saveInquiry', JSON.stringify(saveEntries));
        this.userEntries = [];
        this.userEntries.push(this.savedInquiry);
        localStorage.removeItem('saveInquiry');
        this.form.reset();
        this.validatAndBuildSendStateWindow(true);
    }

    validatAndBuildSendStateWindow(state, entries) {
        let headline;
        let content;
        let btnContent;
        let color;
        let arrChecked;

        if (Array.isArray(state)) {
            arrChecked = state;
            state = 'Array';
        }

        switch (state) {

            case true:
                headline = 'Erfolgreich abgesendet!';
                content = 'Vielen Dank für Ihr Vertrauen. Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich darum kümmern.';
                btnContent = 'Schließen';
                color = this.colorSuccess;
                break;

            case 'mail-or-number-unvalid':
                headline = 'Upps, da ist etwas schiefgelaufen. Versuchen Sie es noch einmal!';
                content = 'Die von Ihnen eingegebene Email Adresse oder Telefonnummer entspricht nicht dem gängigen Format!';
                btnContent = 'Schließen';
                color = this.colorAlert;
                break;

            case 'Array':
                headline = 'Sind Ihre Angaben richtig?';
                let counter = 0;

                content = JSON.stringify(arrChecked).replace(/,/g, match => {
                    counter++
                    return (counter <= 4) ? '\n' : match;
                });

                content = content.replace(/["\\\[\]]/g, '');
                content = content.replace(/Nachricht:/g, '\nNachricht:\n');
                btnContent = 'Ja';
                color = this.colorSuccess;
                this.saveEntr = entries;
                break;

            case false:
                headline = 'Upps, da ist was schief gelaufen. Versuchen sie es noch einmal!';
                content = 'Klicken Sie auf Schließen und korrigieren Sie den falschen Eintrag (Die Einträge in den Eingabefeldern bleiben erhalten).';
                btnContent = 'Schließen';
                color = this.colorAlert;
                break;
        }

        this.buildUserInformationWindow(headline, content, btnContent, color);
    }

    buildUserInformationWindow(headline, content, btnContent, color) {
        this.headlineInputSend.textContent = headline;
        this.paragraphInputSend.textContent = content;
        this.userInputSendBtn.textContent = btnContent;
        this.userInputSendBtn.style.color = color;
        this.headlineInputSend.style.color = color;
        this.paragraphInputSend.style.color = color;

        this.openUserInputSendWindow();
    }

    openUserInputSendWindow() {
        this.userInputSend.style.display = 'flex';
    }
}
