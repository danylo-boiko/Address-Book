let sort = (field) => {
    let rows, i, shouldSwitch;
    let table = document.getElementById("mainTable");
    let switching = true;

    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            let x = rows[i].getElementsByTagName("TD")[field];
            let y = rows[i + 1].getElementsByTagName("TD")[field];
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
};