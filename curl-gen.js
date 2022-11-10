const fs = require('fs');
const codegen = require('postman-code-generators');
const Collection = require('postman-collection').Collection;

async function generateCUrlRecursion(obj, path) {
    let fullPath = `${path}/${obj.name.replace(/\s/g, '-')}`;

    if (obj.hasOwnProperty('request')) {
        if (fs.existsSync(fullPath)) {
            let snippet = replaceVariables(await doGenerateCurl(obj.request));

            try {
                fs.writeFileSync(`${fullPath}/curl`, snippet);
            } catch(e) {
                console.error(`写入代码至 ${fullPath}/curl 文件失败`, e);
            }
        }
    }

    if (obj.hasOwnProperty('items') && Array.isArray(obj.items.members)) {
        for (let member of obj.items.members) {
            generateCUrlRecursion(member, fullPath);
        }
    }
}

function doGenerateCurl(request) {
    let variant = language = 'cURL';
    let options = {
        multiLine: true
    };

    return new Promise((resolve, reject) => {
        codegen.convert(language, variant, request, options, (err, snippet) => {
            if (err) return reject(err);
            
            resolve(snippet.toString());
        });
    });
}

function replaceVariables(snippet) {
    let variables = {
        'esHost': 'http://localhost:9200'
    };

    return snippet.replace(/\{\{(\w*?)\}\}/g, (_, $1) => variables[$1] || '');
}

(async () => {
    let myCollection = new Collection(
        JSON.parse(
            fs.readFileSync('learn-elasticsearch.postman_collection.json').toString()
        )
    );

    for (let memeber of myCollection.items.members) {
        await generateCUrlRecursion(memeber, '.');
    }
}) ();