({
  init: function(cmp, event, helper) {
    var rowActions = [
      { label: cmp.get("v.deleteButtonLabel"), name: "delete" },
    ];
    cmp.set("v.columns", [
      {
        label: cmp.get("v.nameLabel"),
        fieldName: "vincere__Description__c",
        type: "text",
        editable: true,
        cellAttributes: { class: { fieldName: "lineBase" } },
      },
      {
        label: cmp.get("v.finishedLabel"),
        fieldName: "vincere__Finished__c",
        type: "boolean",
        cellAttributes: { class: { fieldName: "lineBase" } },
      },
      {
        label: cmp.get("v.StatusLabel"),
        type: "button",
        initialWidth: 150,
        typeAttributes: {
          label: { fieldName: "actionLabel" },
          title: "Click to Edit",
          default: cmp.get("v.actionOpenButtonLabel"),
          name: "edit_status",
          disabled: { fieldName: "actionDisabled" },
          class: "btn_next",
        },
      },
      {
        label: cmp.get("v.actionLabel"),
        type: "action",
        typeAttributes: { rowActions: rowActions },
      },
    ]);
    helper.getRecords(cmp);
  },
  handleAction: function(cmp, event, helper) {
    var action = event.getParam("action");
    var row = event.getParam("row");
    switch (action.name) {
      case "edit_status":
        helper.updateRecordStatus(cmp, row);
        break;
      case "delete":
        helper.deleteRecord(cmp, row);
        helper.getRecords(cmp);
        break;
      default:
        break;
    }
  },

  handleEdit: function(cmp, event, helper) {
    var draftValues = event.getParam("draftValues");
    helper.updateRecord(cmp, draftValues);
    helper.getRecords(cmp);
  },
  handleAdd: function(cmp, event, helper) {
    helper.addRecord(cmp);
    helper.getRecords(cmp);
  },
});
