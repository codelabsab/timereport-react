export const buildTimeReportData = (data) =>
    data.map(row => buildTimeReportSingle(row));

export const buildTimeReportSingle = (row) =>
    Object.assign({}, row, {
        editable: false,
        setEditable: function (editable) {
            this.editable = editable;
        }
    })