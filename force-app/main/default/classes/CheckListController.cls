public with sharing class CheckListController {
    @AuraEnabled
    public static List<Checklist__c> getRecords(string recordid) {
        List<vincere__Checklist__c> checklist =
                [SELECT Id, RecordID__c, Name,Finished__c, Description__c FROM Checklist__c WHERE RecordID__c LIKE :recordid ORDER BY id ASC];
        return checklist;
    }
    @AuraEnabled
    public static void addRecord(string recordid) {
        Checklist__c  ChecklistTask = new Checklist__c(RecordID__c = recordid);
        ChecklistTask.Name = null;
        insert ChecklistTask;
    }
    @AuraEnabled
    public static void updateRecord(Checklist__c ChecklistRecord) {
        system.debug(ChecklistRecord);
        update ChecklistRecord;
    }
    @AuraEnabled
    public static void deleteRecord(Checklist__c ChecklistRecord) {
        delete ChecklistRecord;
    }
}