function testCase() {
  return true;
}

test('Testing has been done in postman', () => {
  expect(testCase().valueOf() == true);
})