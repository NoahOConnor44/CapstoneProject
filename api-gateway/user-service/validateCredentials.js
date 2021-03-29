function validateEmail(email)
{
    isValid = false;
    let testing = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    // RegEX for emails. After @ cant start with ".", double ".." not allowed anywhere, characters, digit, underscore, and dash allowed.
    if (testing.test(email))
    {
        isValid = true;
    }
    return isValid;
}

function validatePassword(password)
{
    let isValid = false;
    let testing = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$");

    // Minimum eight characters, max 25 characters, at least one uppercase letter, one lowercase letter and one number. No special characters
    if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,25}$/))
    {
        isValid = true;
    }
    
    return isValid;
}

function validateCredentials(email, password) 
{
  return (validateEmail(email) && validatePassword(password));
}

module.exports = { validateCredentials };