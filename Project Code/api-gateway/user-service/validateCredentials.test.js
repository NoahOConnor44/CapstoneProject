const { validateCredentials } = require('./validateCredentials');
const { validateLoginCredentials } = require('./validateCredentials');

// Tested with Jest all of these give the expected results. :)
test('Checking to see if registration credential checker passes or fail', () => {
    // a valid email is passed, password is >= 8 with a lowercase, uppercase, and numbers. Username doesnt exist already.
    expect(validateCredentials("testemail@gmail.com", "Uppercase123", "testUsername")).toBe(true);

    // a valid email is passed, password is >= 8 with NO uppercase, with a lowercase, and numbers. Username doesnt exist already.
    expect(validateCredentials("testemail@gmail.com", "uppercase123", "testUsername")).toBe(false);

    // a valid email is passed, password is >= 8 with uppercase, NO lowercase, and numbers. Username doesnt exist already.
    expect(validateCredentials("testemail@gmail.com", "UPPERCASE123", "testUsername")).toBe(false);

    // a valid email is passed, password is >= 8 with a lowercase, uppercase, NO numbers. Username doesnt exist already.
    expect(validateCredentials("testemail@gmail.com", "Uppercase", "testUsername")).toBe(false);
    
    // a valid email is passed, password is LESS THAN 8 with a lowercase, uppercase, and numbers. Username doesnt exist already.
    expect(validateCredentials("testemail@gmail.com", "Shrt123", "testUsername")).toBe(false);

    // a INVALID email is passed, password is >= 8 with a lowercase, uppercase, and numbers. Username doesnt exist already.
    expect(validateCredentials("testemail@.gmail.com", "Uppercase123", "testUsername")).toBe(false);

    // a INVALID email is passed, password is >= 8 with a lowercase, uppercase, and numbers. Username doesnt exist already.
    expect(validateCredentials("&^!@#$@gmail.com", "Uppercase123", "testUsername")).toBe(false);
    
    // a valid custom business email is passed, password is >= 8 with a lowercase, uppercase, and numbers. Username doesnt exist already.
    expect(validateCredentials("valid@business.org", "BusinessPassword92", "BusinessUsername")).toBe(true);
});

test('Checking to see if login credential checker passes or fail', () => {
    // passing a valid email and password >= 8 with a lowercase, uppercase and numbers.
    expect(validateLoginCredentials('testemail@gmail.com', 'testPassword123')).toBe(true);

    // passing a valid email is passed, password is >= 8 with NO uppercase, with a lowercase, and numbers.
    expect(validateLoginCredentials('testemail@gmail.com', 'testpassword123')).toBe(false);

    // passing a valid email is passed, password is >= 8 with uppercase, NO lowercase, and numbers.
    expect(validateLoginCredentials('testemail@gmail.com', 'TESTPASSWORD123')).toBe(false);

    // passing a valid email is passed, password is >= 8 with uppercase, with lowercase, NO numbers.
    expect(validateLoginCredentials('testemail@gmail.com', 'testPassword')).toBe(false);

    // passing a valid email is passed, password is LESS THAN 8 with uppercase, with lowercase, and numbers.
    expect(validateLoginCredentials('testemail@gmail.com', 'Shrt123')).toBe(false);

    // a INVALID email is passed, password is >= 8 with a lowercase, uppercase, and numbers. Username doesnt exist already.
    expect(validateLoginCredentials("testemail@.gmail.com", "testPassword123")).toBe(false);

    // a INVALID email is passed, password is >= 8 with a lowercase, uppercase, and numbers. Username doesnt exist already.
    expect(validateLoginCredentials("&^!@#$@gmail.com", "testPassword123")).toBe(false);
    
    // a valid custom business email is passed, password is >= 8 with a lowercase, uppercase, and numbers. Username doesnt exist already.
    expect(validateLoginCredentials("valid@business.org", "BusinessPassword92")).toBe(true);
});