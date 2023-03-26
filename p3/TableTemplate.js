class TableTemplate {
    static fillIn(id, dict, columnName) {
        let table = document.getElementById(id);

    // get all table headers
        let headers = table.rows[0].querySelectorAll("td");

        let columns = -1;
        
        // loop headers
        for (let i = 0; i < headers.length; i++) {
            let header = headers[i];

            // replace template variables in header with corresponding values
            let template = new TemplateProcessor(header.innerHTML);
            header.innerHTML = template.fillIn(dict);

            if (columnName == header.textContent) {
                columns = i;
            }
        }

        let numRows = table.rows.length;

        // fill all columns if column name not found
        if (columns === -1) {
            let numCols = headers.length;
            for (let i = 1; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    let cell = table.rows.item(i).cells.item(j);
                    let temp = new TemplateProcessor(cell.innerHTML);
                    cell.innerHTML = temp.fillIn(dict);
                }
            }
        }

        else if (columns >= 0) {
            for (let i = 1; i < numRows; i++) {
                let cell = table.rows.item(i).cells.item(columns);
                let temp = new TemplateProcessor(cell.innerHTML);
                cell.innerHTML = temp.fillIn(dict);
            }
        }

        // visibility
        if (document.getElementById(id).style.visibility === "hidden") {
            document.getElementById(id).style.visibility = "visible";
        }
    }
}