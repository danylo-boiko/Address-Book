window.onload = () => {
    updateRecordsTable();

    //add or update record
    let addOrUpdateRecordForm = document.getElementById('addOrUpdateRecordForm');
    addOrUpdateRecordForm.addEventListener('submit', () => {
        let newRecord = {
            phone: addOrUpdateRecordForm.phone.value,
            fullName: addOrUpdateRecordForm.fullName.value,
            email: addOrUpdateRecordForm.email.value,
            address: addOrUpdateRecordForm.address.value
        };

        let serialNewRecord = JSON.stringify(newRecord);
        localStorage.setItem(newRecord.phone, serialNewRecord);
        location.reload();
    });

    //edit record
    let editLinks = document.querySelectorAll('.editRecord');
    editLinks.forEach(link => link.addEventListener('click', (event) => {
        let record = JSON.parse(localStorage.getItem(event.target.parentElement.parentElement.firstChild.innerText));

        addOrUpdateRecordForm.phone.value = record.phone;
        addOrUpdateRecordForm.fullName.value = record.fullName;
        addOrUpdateRecordForm.email.value = record.email;
        addOrUpdateRecordForm.address.value = record.address;

        showAddNewRecordForm();
    }));

    //delete record
    let deleteLinks = document.querySelectorAll('.deleteRecord');
    deleteLinks.forEach(link => link.addEventListener('click', (event) => {
        localStorage.removeItem(event.target.parentElement.parentElement.firstChild.innerText);

        location.reload();
    }));

    document.getElementById('showAddOrUpdateRecordForm').addEventListener('click', showAddNewRecordForm);
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
};

let showAddNewRecordForm = () => {
    document.getElementById('mainTable').style.display = 'none';
    document.getElementById('showAddOrUpdateRecordForm').style.display = 'none';
    document.getElementById('addOrUpdateRecordForm').style.display = 'block';
};