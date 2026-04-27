public with sharing class bankcontrollerclass {

    @AuraEnabled
    public static Bank__c createdrecored(string banknamelist , string countrylist, string bankemaillist ){
        Bank__c bc = new Bank__c(
            Name = banknamelist,
            Country__c = countrylist,
            BankEmail__c= bankemaillist
        );
        insert bc;
        return bc;

    }
}