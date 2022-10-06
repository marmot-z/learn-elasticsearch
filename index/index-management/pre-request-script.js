let getIndexStatus = (indexName, callback) => {
    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/_cat/indices/${indexName}?h=status`,
        method: 'GET',
    }, (err, resp) => {
        if (err) return callback(err);

        callback(null, resp.text());
    });
};

let closeIndex = (indexName, callback) => {

};

postman.setGlobalVariable('getIndexStatus', getIndexStatus);
postman.setGlobalVariable('closeIndex', closeIndex);
