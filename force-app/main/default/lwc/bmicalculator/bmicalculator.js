import { LightningElement, wire } from 'lwc';
import getaccountmethod from '@salesforce/apex/connectetoaccount.getaccountmethod';
import Type from '@salesforce/schema/Account.Type';
export default class Bmicalculator extends LightningElement {
    data = [];
   
    columns = [
    {label:'Name', fieldName:'Name'},
    {label:'Rating', fieldName:'Rating'},
    {label:'Industry', fieldName: '	Industry'},
];



@wire (getaccountmethod)
getwirdmethod({error,data}){
    if(data){
        this.data= data;
    }
}

}