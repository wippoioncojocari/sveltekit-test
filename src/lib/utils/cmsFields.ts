
const CMSFields = {
     detectFieldType: (json:any) => {
         if (json) {
             if (json.hasOwnProperty("value") && json['value'] != null) {
                 if (typeof json['value'] == "object" && json['value']['d_value']) {
                     return CMSFields.documentField(json);
                 }

                 if (typeof json['value'] == "object" && (json['value']['type'] == 'text' || json['value']['type'] == 'textarea')) {
                     return CMSFields.textField(json);
                 }

                 if (typeof json['value'] === "string") {
                     return CMSFields.contentField(json);
                 }

                 if (typeof json['value'] == "object" && json['value']['files']) {
                     return CMSFields.fileField(json);
                 }

                 if (typeof json['value'] === "boolean") {
                     return CMSFields.checkboxField(json);
                 }

                 if (typeof json['value'] == "object" && json['value']['type'] == "number") {
                     return CMSFields.numberField(json);
                 }


             } else if (typeof json === "object" && json.hasOwnProperty("value") && json['value'] === null) {
                 if (json.hasOwnProperty("repeated_fields")) {
                     return CMSFields.repeatedFields(json["repeated_fields"]);
                 }
             }
         }

         return ''

     },

    repeatedFields: (rows:Array<any>) => {
        let result: any[] = [];

        rows?.map(row => {
            let rowFields:any = {};

            Object.keys(row).map(key => {
                rowFields[key] = CMSFields.detectFieldType(row[key]);
            });

            result.push(rowFields);
        });

        return result;
    },

    textField: (json:any) => {
        if (typeof json === "object" && json['value']) {
            if (typeof json['value']['text'] === "string") return json['value']['text'];

            if (typeof json['value']['value'] === "string") return json['value']['value'];
        }

        return '';
    },

    numberField: (json:any) => {

        if (typeof json === "object" && json['value']) {
            if (typeof json['value']['text'] === "string") return json['value']['text'];

            if (typeof json['value']['value'] === "string") return json['value']['value'];
        }

        return '';
    },

    fileField: (json:any) => {
        if (typeof json === "object" && json['value'] && Array.isArray(json['value']['files'])) {
            return json['value']['files'];
        }

        return [];
    },

    checkboxField: (json:any) => {
        if (typeof json === "object" && typeof json['value'] === "boolean") {
            return Boolean(json['value']);
        }

        return false;
    },

    contentField: (json:any) => {
        if (typeof json === "object" && json['value']) {
            return json['value'];
        }

        return '';
    },

    documentField: (json:any) => {
        if (json != null && json['value'] && json['value']['d_value']) {
            if (Array.isArray(json['value']['d_value']['types'])) {

                return json['value']['d_value'];
            }
        }

        return {};
    }
}

export default CMSFields;