let getAlias = (indexName, cb) => {
    pm.sendRequest({    
        url: `${pm.collectionVariables.get('esHost')}/${indexName}/_alias`,
        method: 'GET'
    }, (err, resp) => {
        if (err) throw err;

        cb(null, resp.json());
    });
};

postman.setGlobalVariable('getAlias', getAlias);
