public with sharing class connectetoaccount {
    @AuraEnabled(Cacheable=true)
   public static list<Account> getaccountmethod(){
    return [select Id,Name,Rating,Industry from Account limit 10];
   }
}