({
  getRecords: function(cmp) {
    var action = cmp.get("c.getRecords");
    action.setParams({ recordid: cmp.get("v.recordId") });
    action.setCallback(
      this,
      $A.getCallback(function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          var resp = response.getReturnValue();
          resp.forEach((row) => {
            if (row.Finished__c == true) {
              row.actionLabel = cmp.get("v.actionOpenButtonLabel");
              row.lineBase = "linethrough";
            } else {
              row.actionLabel = cmp.get("v.actionCloseButtonLabel");
              row.lineBase = "linethrough-none";
            }
          });
          cmp.set("v.data", resp);
        } else if (state === "ERROR") {
          var errors = response.getError();
          console.error(errors);
        }
      })
    );
    $A.enqueueAction(action);
  },
  addRecord: function(cmp) {
    var action = cmp.get("c.addRecord");
    action.setParams({ recordid: cmp.get("v.recordId") });
    action.setCallback(
      this,
      $A.getCallback(function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
        } else if (state === "ERROR") {
          var errors = response.getError();
          console.error(errors);
        }
      })
    );
    $A.enqueueAction(action);
  },
  updateRecord: function(cmp, draftValues) {
    var action = cmp.get("c.updateRecord");
    action.setParams({ ChecklistRecord: draftValues[0] });
    action.setCallback(
      this,
      $A.getCallback(function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          cmp.set("v.draftValues", []);
        } else if (state === "ERROR") {
          var errors = response.getError();
          console.error(errors);
        }
      })
    );
    $A.enqueueAction(action);
  },
  deleteRecord: function(cmp, row) {
    var action = cmp.get("c.deleteRecord");
    action.setParams({ ChecklistRecord: row });
    action.setCallback(
      this,
      $A.getCallback(function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
          cmp.set("v.draftValues", []);
        } else if (state === "ERROR") {
          var errors = response.getError();
          console.error(errors);
        }
      })
    );
    $A.enqueueAction(action);
  },
  //Helper function
  updateRecordStatus: function(cmp, row) {
    var data = cmp.get("v.data");
    var rows = [];
    switch (row.Finished__c) {
      case true:
        row.lineBase = "linethrough-none";
        row.actionLabel = cmp.get("v.actionCloseButtonLabel");
        row.Finished__c = false;
        break;
      case false:
        row.actionLabel = cmp.get("v.actionOpenButtonLabel");
        row.lineBase = "linethrough";
        row.Finished__c = true;
        break;
      default:
        break;
    }
    rows.push(row);
    this.updateRecord(cmp, rows);
    cmp.set("v.data", data);
  },
});
