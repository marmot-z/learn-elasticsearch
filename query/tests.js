const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));

asyncSeries([
    cb => deleteIndex('tmdb', cb)
], (err, resp) => {
    if (err) throw err;
});
