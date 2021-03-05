window.onload = () => {
    updateRecordsTable();

    //adding a new record
    let addOrEditRecordForm = document.getElementById('addNewOrUpdateRecordForm');
    addOrEditRecordForm.addEventListener('submit', () => {
        let newRecord = {
            phone: addOrEditRecordForm.phone.value,
            fullName: addOrEditRecordForm.fullName.value,
            email: addOrEditRecordForm.email.value,
            address: addOrEditRecordForm.address.value
        };

        let serialNewRecord = JSON.stringify(newRecord);
        localStorage.setItem(newRecord.phone, serialNewRecord);
        location.reload();
    });

    //edit record
    let editLinks = document.querySelectorAll('.editRecord');
    editLinks.forEach(link=> link.addEventListener('click', (event) => {
        let record = JSON.parse(localStorage.getItem(event.target.parentElement.parentElement.firstChild.innerText));
        addOrEditRecordForm.phone.value = record.phone;
        addOrEditRecordForm.fullName.value = record.fullName;
        addOrEditRecordForm.email.value = record.email;
        addOrEditRecordForm.address.value = record.address;
        showAddNewRecordForm();
    }));

    //delete record
    let deleteLinks = document.querySelectorAll('.deleteRecord');
    deleteLinks.forEach(link=> link.addEventListener('click', (event) => {
        localStorage.removeItem(event.target.parentElement.parentElement.firstChild.innerText);
        location.reload();
    }));

    document.getElementById('showAddNewOrUpdateRecordForm').addEventListener('click', showAddNewRecordForm);
};

let updateRecordsTable = () => {
    document.getElementById('recordsList').innerHTML = '';
    for (let i = 0, len = localStorage.length; i < len; i++) {
        let record = JSON.parse(localStorage.getItem(localStorage.key(i)));

        document.getElementById('recordsList').innerHTML +=
            '<tr><td>' + record.phone + '</td><td>' + record.fullName + '</td><td>' + record.email + '</td><td>' + record.address +
            '</td><td><span class="editRecord">Edit</span> | <span class="deleteRecord">Delete</span></td></tr>';
    }
};

let showAddNewRecordForm = () => {
    document.getElementById('mainTable').style.display = 'none';
    document.getElementById('showAddNewOrUpdateRecordForm').style.display = 'none';
    document.getElementById('addNewOrUpdateRecordForm').style.display = 'block';
};