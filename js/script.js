window.onload = () => {
    updateRecordsTable();

    //add or update record
    let addOrEditRecordForm = document.getElementById('addOrEditRecordForm');
    addOrEditRecordForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newRecord = {
            phone: addOrEditRecordForm.phone.value,
            fullName: addOrEditRecordForm.fullName.value,
            email: addOrEditRecordForm.email.value,
            address: addOrEditRecordForm.address.value
        };

        addOrEditRecordForm.phone.value = '';
        addOrEditRecordForm.fullName.value = '';
        addOrEditRecordForm.email.value = '';
        addOrEditRecordForm.address.value = '';

        let serialNewRecord = JSON.stringify(newRecord);
        localStorage.setItem(newRecord.phone, serialNewRecord);

        showMainTable();
        updateRecordsTable();
    });

    //full name filter
    let filterFullNameForm = document.getElementById('fullNameFilterForm');
    filterFullNameForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let countFilerResult = 0;
        document.getElementById('recordsList').innerHTML = '';

        for (let i = 0; i < localStorage.length; i++) {
            let record = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (record.fullName.includes(filterFullNameForm.fullNameFilter.value)) {
                countFilerResult++;
                document.getElementById('recordsList').innerHTML +=
                    '<tr><td>' + record.phone + '</td><td>' + record.fullName + '</td><td>' + record.email + '</td><td>' + record.address +
                    '</td><td><span class="editRecord">Edit</span> | <span class="deleteRecord">Delete</span></td></tr>';
            }
        }

        updateEditLinks();
        updateDeleteLinks();

        if (countFilerResult === 0) {
            document.getElementById('recordsList').innerHTML = '<tr><td colspan="5">No records with a similar full name.</td></tr>';
        }
    });

    document.getElementById('showAddOrEditRecordForm').addEventListener('click', showAddOrEditRecordForm);
    document.getElementById('sortByPhone').addEventListener('click', () => sort(0));
    document.getElementById('sortByFullName').addEventListener('click', () => sort(1));
    document.getElementById('sortByEmail').addEventListener('click', () => sort(2));
    document.getElementById('sortByAddress').addEventListener('click', () => sort(3));
};

let updateRecordsTable = () => {
    document.getElementById('recordsList').innerHTML = '';
    if (localStorage.length === 0) {
        document.getElementById('recordsList').innerHTML = '<tr><td colspan="5">You have no records. Why not add a few?</td></tr>';
        return;
    }

    for (let i = 0; i < localStorage.length; i++) {
        let record = JSON.parse(localStorage.getItem(localStorage.key(i)));
        document.getElementById('recordsList').innerHTML +=
            '<tr><td>' + record.phone + '</td><td>' + record.fullName + '</td><td>' + record.email + '</td><td>' + record.address +
            '</td><td><span class="editRecord">Edit</span> | <span class="deleteRecord">Delete</span></td></tr>';
    }

    updateEditLinks();
    updateDeleteLinks();
};

let updateEditLinks = () => {
    let addOrUpdateRecordForm = document.getElementById('addOrEditRecordForm');
    document.querySelectorAll('.editRecord').forEach(link => link.addEventListener('click', (event) => {
        let record = JSON.parse(localStorage.getItem(event.target.parentElement.parentElement.firstChild.innerText));

        addOrUpdateRecordForm.phone.value = record.phone;
        addOrUpdateRecordForm.fullName.value = record.fullName;
        addOrUpdateRecordForm.email.value = record.email;
        addOrUpdateRecordForm.address.value = record.address;

        showAddOrEditRecordForm();
    }));
};

let updateDeleteLinks = () => {
    document.querySelectorAll('.deleteRecord').forEach(link => link.addEventListener('click', (event) => {
        localStorage.removeItem(event.target.parentElement.parentElement.firstChild.innerText);
        updateRecordsTable();
    }));
};

let showAddOrEditRecordForm = () => {
    document.getElementById('mainTable').style.display = 'none';
    document.getElementById('showAddOrEditRecordForm').style.display = 'none';
    document.getElementById('fullNameFilterForm').style.display = 'none';
    document.getElementById('addOrEditRecordForm').style.display = 'block';
};

let showMainTable = () => {
    document.getElementById('mainTable').style.display = 'block';
    document.getElementById('showAddOrEditRecordForm').style.display = 'block';
    document.getElementById('fullNameFilterForm').style.display = 'block';
    document.getElementById('addOrEditRecordForm').style.display = 'none';
};