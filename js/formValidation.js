let validateInputs = (form) => {
    const phone = form.phone.value.trim();
    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const address = form.address.value.trim();

    if (phone === '') {
        alert('Phone cannot be blank');
        return false;
    } else if (!isPhone(phone)) {
        alert('Not a valid phone');
        return false;
    }

    if (fullName === '') {
        alert('full name cannot be blank');
        return false;
    } else if (!isFullName(fullName)) {
        alert('Not a valid full name');
        return false;
    }

    if (email === '') {
        alert('Email cannot be blank');
        return false;
    } else if (!isEmail(email)) {
        alert('Not a valid email');
        return false;
    }

    if (address === '') {
        alert('Address cannot be blank');
        return false;
    } else if (!isAddress(address)) {
        alert('Not a valid address');
        return false;
    }

    return true;
};


let isPhone = (phone) => {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone);
};

let isFullName = (fullName) => {
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(fullName);
};

let isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

let isAddress = (address) => {
    return /^[a-zA-Z0-9\s,'-]*$/.test(address);
};