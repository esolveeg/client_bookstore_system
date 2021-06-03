export default {
  deleted_id: "",
  deleted_name: "",
  deleted_model: "",
  current_page: 1,
  permissions: [],
  roles: [],
  branch_id: "",
  userId: "",
  selected_ids: [],
  isPos: false,
  me: {},
  deleteBtn: {
    title: "delete",
    icon: "delete",
    type: "danger",
    modal: "multi-delete-modal",
    emit: "bulkDelete"
  },
  createBtn: {
    title: "create",
    emit: "create",
    icon: "add_circle",
    type: "success"
  },
  perPage: ["2", "10", "20", "30", "50", "100"],
  tableData: {
    length: 10,
    search: "",
    column: 0
  }
};
