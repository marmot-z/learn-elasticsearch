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
    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${indexName}/_close`,
        method: 'POST',
    }, (err, resp) => {
        if (err) return callback(err);

        let body = resp.json();

        callback(
            body.acknowledged ? 
                null:
                new Error(`${indexName} 关闭失败`), 
            body.acknowledged
        );
    });
};

postman.setGlobalVariable('getIndexStatus', getIndexStatus);
postman.setGlobalVariable('closeIndex', closeIndex);
