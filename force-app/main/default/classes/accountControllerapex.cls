public with sharing class accountControllerapex {
    @auraEnabled(Cacheable=true)
    public static list<Account>getaccountlist( String searchaccount){
        return[select Id,Name, Rating, Industry from Account where Name like: ('%' +searchaccount + '%' ) limit 10];
    }
}