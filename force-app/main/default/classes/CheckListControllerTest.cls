@isTest(SeeAllData=true)
private class CheckListControllerTest {
  static testMethod void TestGetRecords() {
    Checklist__c currentchecklist = new Checklist__c();
    currentchecklist.RecordId__c = '00T0Q00000A51LkUAJ';
    insert currentchecklist;
    List<Checklist__c> RecordsToBeFound = [
      SELECT Id
      FROM Checklist__c
      WHERE RecordId__c = '00T0Q00000A51LkUAJ'
    ];

    List<Checklist__c> checklisttocheck = CheckListController.getRecords(
      '00T0Q00000A51LkUAJ'
    );
    system.assertEquals(RecordsToBeFound.size(), checklisttocheck.Size());
  }
  static testMethod void TestAddRecord() {
    Test.startTest();
    CheckListController.addRecord('00T0Q00000A51LkUAJ');
    Checklist__c RecordToBeChecked = [
      SELECT Id, RecordId__c
      FROM Checklist__c
      WHERE RecordId__c = '00T0Q00000A51LkUAJ'
      ORDER BY id DESC
      LIMIT 1
    ];
    Test.stopTest();
    system.assertEquals('00T0Q00000A51LkUAJ', RecordToBeChecked.RecordId__c);
  }
  static testMethod void TestUpdateRecord() {
    Checklist__c addRecord = new Checklist__c();
    addRecord.RecordId__c = '00T0Q00000A51LkUAJ';
    insert addRecord;
    Checklist__c RecordsToBeFound = [
      SELECT Id, Name
      FROM Checklist__c
      WHERE RecordId__c = '00T0Q00000A51LkUAJ'
      ORDER BY id ASC
      LIMIT 1
    ];
    RecordsToBeFound.Name = 'old';
    update RecordsToBeFound;
    Test.startTest();
    RecordsToBeFound.Name = 'test';
    CheckListController.updateRecord(RecordsToBeFound);
    Test.stopTest();
    Checklist__c RecordToBeChecked = [
      SELECT Id, Name
      FROM Checklist__c
      WHERE RecordId__c = '00T0Q00000A51LkUAJ'
      ORDER BY id ASC
      LIMIT 1
    ];

    system.assertEquals('test', RecordToBeChecked.Name);
  }
  static testMethod void TestDeleteRecord() {
    Checklist__c RecordToBeDeleted = new Checklist__c(
      RecordId__c = '00T0Q00000A51LkUAJ'
    );
    insert RecordToBeDeleted;
    Test.startTest();
    CheckListController.deleteRecord(RecordToBeDeleted);
    Test.stopTest();
    Checklist__c[] RecordToBeChecked = [
      SELECT Id, Name
      FROM Checklist__c
      WHERE Id = :RecordToBeDeleted.Id
    ];

    system.assertEquals(new List<Checklist__c>(), RecordToBeChecked);
  }
}
