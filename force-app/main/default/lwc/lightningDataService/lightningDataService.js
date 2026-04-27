import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
 
export default class LightningDataService extends LightningElement {
    contacts;
    error;
    
    @wire(getListUi, {
        objectApiName: CONTACT_OBJECT,
        listViewApiName: 'AllContacts'
    })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data.records.records;
            this.error = undefined;
            console.log('Contacts loaded:', this.contacts);
        } else if (error) {
            this.error = error;
            this.contacts = undefined;
            console.error('Error loading contacts:', error);
        }
    }
}
