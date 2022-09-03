declare module "@salesforce/apex/vincere.CheckListController.getRecords" {
  export default function getRecords(param: {recordid: any}): Promise<any>;
}
declare module "@salesforce/apex/vincere.CheckListController.addRecord" {
  export default function addRecord(param: {recordid: any}): Promise<any>;
}
declare module "@salesforce/apex/vincere.CheckListController.updateRecord" {
  export default function updateRecord(param: {ChecklistRecord: any}): Promise<any>;
}
declare module "@salesforce/apex/vincere.CheckListController.deleteRecord" {
  export default function deleteRecord(param: {ChecklistRecord: any}): Promise<any>;
}
