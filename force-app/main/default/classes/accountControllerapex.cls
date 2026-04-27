public with sharing class accountControllerapex {
    @auraEnabled(Cacheable=true)
    public static list<Account>getaccountlist( String searchaccount){
        return[select Id,Name, Rating, Industry from Account where Name like: ('%' +searchaccount + '%' ) limit 10];
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, Industry FROM Account LIMIT 10];
    }

    @AuraEnabled
    public static Account createAccount(String accountlist, String industrylist) {
        Account acc = new Account(
            Name = accountlist,
            Industry = industrylist
        );
        insert acc;
        return acc;
    }
}
