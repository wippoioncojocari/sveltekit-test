import fs from "fs"

class ImgSync {
    static hello = "PUBLIC_CMS_PROJECT_ID"

    static getFilePath = (fileName = '', api_id = '') => {
        return `/cms/images/${api_id}` + (fileName.length ? '/'+fileName.replaceAll(' ', '') : '');
    };

    static searchFiles = (json = {}) => {
        const files = [];

        if ( json && typeof json === "object" ) {
            Object.keys(json).map(key => {
                const item = json[key];

                if ( Array.isArray(item) && item[0]?.path ) {
                    item.map(f => files.push(f));
                } else {
                    this.searchFiles(item).map(f => files.push(f));
                }
            })
        }

        return files;
    };

    static creatDirectoryIfNotExists = async (directory = '') => {
        try {
            await new Promise((resolve, reject) => {
                fs.access(directory, (error) => {
                    if (error) {
                        fs.mkdir(directory, { recursive: true }, (error) => {
                            if (error) {
                                console.log(error);
                                reject();

                                throw Error(`sync.js [creatDirectoryIfNotExists()]`);
                            } else {
                                resolve(true);
                            }
                        });
                    } else {
                        reject();
                    }
                });
            });
        } catch (e) {

        }
    }

    static downloadFile = (url = '', filePath = '') => {
        // console.log('[run] sync.mjs: downloadFile', encodeURI(url), filePath);

        return new Promise((resolve, reject) => {
            try {
                if (url.search('https') > -1) {
                    clientHttps.get(encodeURI(url), (res) => {
                        res.pipe(fs.createWriteStream(filePath.replaceAll(' ', '')))
                            .on('error', function(e){
                                console.log('[error] sync.mjs: downloadFile https pipe', e);
                                console.log('[error] sync.mjs: downloadFile https pipe', encodeURI(url));
                                reject();
                            }).on('finish', () => {
                            resolve();
                        });
                    }).on('error', function(err) { // Handle errors
                        console.log('[error] sync.mjs: downloadFile https', err);
                        console.log('[error] sync.mjs: downloadFile https', encodeURI(url));
                        reject();
                    });
                } else {
                    clientHttp.get(encodeURI(url), (res) => {
                        res.pipe(fs.createWriteStream(filePath.replaceAll(' ', '')))
                            .on('error', function(e){
                                console.log('[error] sync.mjs: downloadFile http pipe', e);
                                console.log('[error] sync.mjs: downloadFile http pipe', encodeURI(url));
                                reject();
                            }).on('finish', () => {
                            resolve();
                        });
                    }).on('error', function(err) { // Handle errors
                        console.log('[error] sync.mjs: downloadFile http', err);
                        console.log('[error] sync.mjs: downloadFile http', encodeURI(url));
                        reject();
                    });
                }
            } catch (e) {
                console.log('[error] sync.mjs: downloadFile', e);
                console.log('[error] sync.mjs: downloadFile', url, filePath);

                reject();
            }
        })
    }


    static storeFieldsFiles = ( types = [] ) => {
        const fields = [];

        types.map((block) => {
            const list = this.searchFiles(block);

            list.map(f => fields.push(f));
        });

        return fields;
    }

    static updateImages = async (types = [], api_id)=> {
        const files = this.storeFieldsFiles(types); //console.log(api_id, files.length);

        const path = './public' + this.getFilePath('', api_id);

        await this.creatDirectoryIfNotExists(path);

        for (let i in files) {
            const file = files[i];

            await this.downloadFile(process.env.CMS_DOMAIN + file['path'], './public'+this.getFilePath(file['name'], api_id));
        }
    }
}

export default ImgSync