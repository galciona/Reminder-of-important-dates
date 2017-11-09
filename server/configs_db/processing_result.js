const error = { 'error': 'An error has occurred' };

module.exports = (err, res, f) => {
    if (err) {
        f({ 'error': 'An error has occurred' });
    } else {
        f(res);
    }
}