import { LightningElement } from 'lwc';
import createAccount from '@salesforce/apex/accountControllerapex.createAccount';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Imperactivemethodtoaire extends LightningElement {
    idvalue;
    namevalue;
   industryvalue;
   handlename(event){
    this.namevalue = event.target.value;

   }
   handleindustry(event){
    this.industryvalue = event.target.value;
   }
   handlecreateaccount(){
createAccount({accountlist: this.namevalue, industrylist:this.industryvalue})
.then(result=>{
    console.log('result:'+ JSON.stringify(result));
    this.idvalue = result.Id;
    //successfully condition
    const evt = new ShowToastEvent({
        title : 'Account creation',
        message:'Account successfully created',
        variant:'success',
    });
    this.dispatchEvent(evt);
})
.catch(error => {
    console.log('error: ' + error);
    const errorEvt = new ShowToastEvent({
        title: 'Error',
        message: 'Error creating account',
        variant: 'error',
    });
    this.dispatchEvent(errorEvt);
});
   }
}