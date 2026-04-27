import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RateofInterest extends LightningElement {
    @api amount;
    @api discount;
    @api finalAmount;
    @api remainingAmount;
    handlechangeamount(event){
        this.amount= event.target.value;
        this.result();
    }
    handlechangediscount(event){
        this.discount = event.target.value;
        this.result();
    }
    result(){
        if(this.amount && this.discount){
            this.finalAmount = this.amount - (this.amount * this.discount / 100);
            this.remainingAmount = this.amount -this.finalAmount;
        }
    }
     handleresult(){
        this.result();
        const event = new ShowToastEvent({
            title: 'Result',
            message: `Final Amount: ${this.finalAmount}, Remaining Amount: ${this.remainingAmount}`,
            variant: 'success',
        });
        this.dispatchEvent(event);  
     }

     selected = false;
     handletoggle(){
        this.selected =! this.selected;
     }
     messages='';
     constructor(){
        super();
        this.messages= "Follow and Following are the same in this context.";
     }
}