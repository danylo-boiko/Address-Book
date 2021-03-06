let filterFullName = (form,event) =>{
    event.preventDefault();

    let countFilterRecords = 0;
    document.getElementById('recordsList').innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        let record = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (record.fullName.includes(form.fullNameFilter.value)) {
            countFilterRecords++;
            document.getElementById('recordsList').innerHTML +=
                '<tr><td>' + record.phone + '</td><td>' + record.fullName + '</td><td>' + record.email + '</td><td>' + record.address +
                '</td><td><span class="editRecord">Edit</span> | <span class="deleteRecord">Delete</span></td></tr>';
        }
    }

    updateEditLinks();
    updateDeleteLinks();

    if (countFilterRecords === 0) {
        document.getElementById('recordsList').innerHTML = '<tr><td colspan="5">No records with a similar full name.</td></tr>';
    }
};
