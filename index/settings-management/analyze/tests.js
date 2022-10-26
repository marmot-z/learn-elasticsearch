const body = pm.response.json();

pm.test('analzye successful', () => {
    pm.expect(body.tokens[0].token).eq('test');
});
