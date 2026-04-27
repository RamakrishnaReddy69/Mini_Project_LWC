import { LightningElement } from 'lwc';
import createdrecored from '@salesforce/apex/bankcontrollerclass.createdrecored';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class Bankrecordcreated extends LightningElement {
    Idvalue;
    banknamevalue;
    countryvalue;
    bankemailvalue;
handlechangename(event){
    this.banknamevalue = event.target.value;
}
handlerchangecountry(event){
    this.countryvalue= event.target.value;
}
handlechangeemail(event){
    this.bankemailvalue = event.target.value;
}
handleclikcreatedrec(){
    createdrecored({banknamelist: this.banknamevalue ,countrylist: this.countryvalue ,
        bankemaillist: this.bankemailvalue})
        .then(result=>{
            console.log('result:'+ JSON.stringify(result));
            this.Idvalue = result.id;
            //success condtion..
        const evt =new ShowToastEvent({
            title :'Bank Record is a creation',
            meassage: 'Bank record is a created successfully created',
            variant:'success',
        });
        this.dispatchEvent(evt);
        })
        .catch(error=>{
            console.log('error:'+ error);
            const errorevt =new ShowToastEvent({
                title :'error',
                meassage: 'error creating Bank record',
                variant:'error'
        });
        this.dispatchEvent(errorevt);
    });
}
}
