const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));

asyncSeries([
    cb => {
        if (pm.collectionVariables.get('collection.finish')) {
            deleteIndex('tmdb', cb);

            pm.collectionVariables.set('tmdb.inited', false);
            pm.collectionVariables.set('collection.finish', false);
        } else {
            cb(null);
        }
    }
], (err, resp) => {
    if (err) throw err;
});
