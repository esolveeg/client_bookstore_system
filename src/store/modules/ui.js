export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    tableName: "",
    item: "",
  },
  // -----------------------------------------------------------------
  getters: {
    tableName: (state) => {
      return state.tableName;
    },
    item: (state) => {
      return state.item;
    },
  },
  // -----------------------------------------------------------------
  mutations: {
    setTableName(state, payload) {
      state.tableName = payload;
    },
    setItem(state, payload) {
      state.item = payload;
    },
  },
  // -----------------------------------------------------------------
  actions: {
    showDeleteModal(ctx, payload) {
      ctx.commit("setTableName", payload.table);
      ctx.commit("setItem", payload.item);

      payload.modal.show("modal-deletess");
    },

    printData() {
      setTimeout(() => {
        const prtHtml = document.getElementById("invoice-POS").innerHTML;

        // Get all stylesheets HTML
        let stylesHtml = "";
        for (const node of [
          ...document.querySelectorAll('link[rel="stylesheet"], style'),
        ]) {
          stylesHtml += node.outerHTML;
        }

        // Open the print window
        const WinPrint = window.open(
          "",
          "",
          "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0",
        );

        WinPrint.document.write(`<!DOCTYPE html>
              <html>
                <head>
                  ${stylesHtml}
                  <style>
                    #invoice-POS{
                      display:block !important;
                    }
                  </style>
                </head>
                <body>
                  ${prtHtml}
                </body>
              </html>`);

        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
        // location.reload();
      }, 1000);
    },
  },
};
