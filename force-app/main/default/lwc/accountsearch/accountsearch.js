import { LightningElement } from 'lwc';
import getaccountlist from '@salesforce/apex/accountControllerapex.getaccountlist';   
export default class Accountsearch extends LightningElement {
   accounts;
   handlechangeaccount(event){
    const searchaccount = event.target.value;
    getaccountlist({searchaccount})
    .then(result=>
        {this.accounts=result
            console.log('result--> ' , result);
        }).catch(error=>{
            console.error('error-->',error);   
        });
   }
}