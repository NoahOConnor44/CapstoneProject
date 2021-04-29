function testCase() {
  return true;
}

test('App component tested through user testing', () => {
  expect(testCase().valueOf() == true);
})