export const buildTimeReportData = (data) =>
    data.map(row => buildTimeReportSingle(row));

export const buildTimeReportSingle = (row) =>
    Object.assign({}, row, {
        editable: false,
        toggleEditable: function () {
            this.editable = !this.editable;
        }
    })