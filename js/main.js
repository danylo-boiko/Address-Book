window.onload = () => {
    updateRecordsTable();

    let addOrEditRecordForm = document.getElementById('addOrEditRecordForm');
    addOrEditRecordForm.addEventListener('submit', (e) => addOrUpdateRecord(addOrEditRecordForm, e));

    let filterFullNameForm = document.getElementById('fullNameFilterForm');
    filterFullNameForm.addEventListener('submit', (e) => filterFullName(filterFullNameForm, e));

    document.getElementById('showAddOrEditRecordForm').addEventListener('click', showAddOrEditRecordForm);

    document.getElementById('sortByPhone').addEventListener('click', () => sortByField(0));
    document.getElementById('sortByFullName').addEventListener('click', () => sortByField(1));
    document.getElementById('sortByEmail').addEventListener('click', () => sortByField(2));
    document.getElementById('sortByAddress').addEventListener('click', () => sortByField(3));
};

let addOrUpdateRecord = (form, e) => {
    e.preventDefault();

    if (!validateInputs(form)) {
        return;
    }

    let newRecord = {
        phone: form.phone.value,
        fullName: form.fullName.value,
        email: form.email.value,
        address: form.address.value
    };

    let serialNewRecord = JSON.stringify(newRecord);
    localStorage.setItem(newRecord.phone, serialNewRecord);

    form.reset();
    showMainTable();
    updateRecordsTable();
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
    let addOrEditRecordForm = document.getElementById('addOrEditRecordForm');
    document.querySelectorAll('.editRecord').forEach(link => link.addEventListener('click', (event) => {
        let record = JSON.parse(localStorage.getItem(event.target.parentElement.parentElement.firstChild.innerText));

        addOrEditRecordForm.phone.value = record.phone;
        addOrEditRecordForm.fullName.value = record.fullName;
        addOrEditRecordForm.email.value = record.email;
        addOrEditRecordForm.address.value = record.address;

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