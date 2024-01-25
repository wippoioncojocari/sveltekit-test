class CMSFields {
    static detectFieldType = (json:any) => {
        if(json) {
            if (json.hasOwnProperty("value") && json['value'] != null) {
                if (typeof json['value'] == "object" && json['value']['d_value']) {
                    return this.documentField(json);
                }

                if (typeof json['value'] == "object" && json['value']['type'] == 'text') {
                    return this.textField(json);
                }

                if (typeof json['value'] === "string") {
                    return this.contentField(json);
                }

                if (typeof json['value'] == "object" && json['value']['files']) {
                    return this.fileField(json);
                }

                if (typeof json['value'] === "boolean") {
                    return this.checkboxField(json);
                }

                if (typeof json['value'] == "object" && json['value']['type'] == "number") {
                    return this.numberField(json);
                }


            } else if(typeof json === "object" && json.hasOwnProperty("value") && json['value'] === null) {
                if (json.hasOwnProperty("repeated_fields")) {
                    return this.repeatedFields(json["repeated_fields"]);
                }
            }
        }

        return ''

    }

    static repeatedFields = (rows:Array<any>) => {
        let result: any[] = [];

        rows?.map(row => {
            let rowFields:any = {};

            Object.keys(row).map(key => {
                rowFields[key] = this.detectFieldType(row[key]);
            });

            result.push(rowFields);
        });

        return result;
    }

    static textField = (json:any) => {
        if (typeof json === "object" && json['value']) {
            if (typeof json['value']['text'] === "string") return json['value']['text'];

            if (typeof json['value']['value'] === "string") return json['value']['value'];
        }

        return '';
    }

    static numberField = (json:any) => {

        if (typeof json === "object" && json['value']) {
            if (typeof json['value']['text'] === "string") return json['value']['text'];

            if (typeof json['value']['value'] === "string") return json['value']['value'];
        }

        return '';
    }

    static fileField = (json:any) => {
        if (typeof json === "object" && json['value'] && Array.isArray(json['value']['files'])) {
            return json['value']['files'];
        }

        return [];
    }

    static checkboxField = (json:any) => {
        if (typeof json === "object" && typeof json['value'] === "boolean") {
            return Boolean(json['value']);
        }

        return false;
    }

    static contentField = (json:any) => {
        if (typeof json === "object" && json['value']) {
            return json['value'];
        }

        return '';
    }

    static documentField(json:any) {
        if (json != null && json['value'] && json['value']['d_value']) {
            if (Array.isArray(json['value']['d_value']['types'])) {

                return json['value']['d_value'];
            }
        }

        return {};
    }
}

export default CMSFields;