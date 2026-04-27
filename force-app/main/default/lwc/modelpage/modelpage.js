import { LightningElement, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

// Fields to retrieve
const FIELDS = ['Account.Name', 'Account.Phone', 'Account.Industry'];

export default class Modelpage extends LightningElement {
    @track accountId = '';
    @track accountRecord = null;

    // Wire adapter to load the account when accountId changes.
    @wire(getRecord, { recordId: '$accountId', fields: FIELDS })
    wiredRecord({ error, data }) {
        if (data) {
            this.accountRecord = {
                Id: this.accountId,
                Name: data.fields.Name ? data.fields.Name.value : '',
                Phone: data.fields.Phone ? data.fields.Phone.value : '',
                Industry: data.fields.Industry ? data.fields.Industry.value : ''
            };
        } else if (error) {
            // eslint-disable-next-line no-console
            console.error('Error loading account via wire', error);
            this.accountRecord = null;
        } else {
            this.accountRecord = null;
        }
    }

    handleIdChange(event) {
        this.accountId = event.target.value;
    }

    // Load account and open modal
    openAccountModal() {
        if (!this.accountId) {
            // Could show a toast; for now just return
            return;
        }

        // The record data is loaded via the @wire adapter above and mapped into this.accountRecord.
        // Open the modal via imperative call
        try {
            const modal = this.template.querySelector('c-modal');
            if (modal) {
                modal.record = this.accountRecord;
                modal.openModal();
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error opening modal', error);
        }
    }

    // Handle save event from modal
    handleSave(event) {
        // event.detail can carry updated record data if modal sends it
        const updated = event.detail;
        // For demonstration we'll log it
        // eslint-disable-next-line no-console
        console.log('Saved account data from modal:', updated);
        // In a real implementation you would call an Apex or uiRecordApi updateRecord here
    }
}