import CMSFields from "./cmsFields"

class cms {

    static BLOCK_SEO = "block_seo"
    static BLOCK_FULL_WIDTH_CAROUSEL = "block_full_width_carousel"
    static BLOCK_CATEGORY_GAMES_SLIDER = "block_category_games_slider"


    static footer_data = {}

    static getAllFields = (json:any) => {
        let result:any = {}


        if(typeof json === "object") {
            let keys = Object.keys(json)

            keys.forEach((k:string) => {
                let res = CMSFields.detectFieldType(json[k])
                if(res) result[k] = res
            })

            let result_keys = Object.keys(result)

            result_keys.forEach((k) => {
                if(Array.isArray(result[k])){

                    result[k].map((item:any, i:number) => {
                        if(typeof item === "object") {
                            let item_keys = Object.keys(item)

                            item_keys.forEach((k1) => {
                                if(typeof item[k1] == "object") {
                                    let item_keys1 = Object.keys(item[k1])

                                    item_keys1.forEach((k2) => {

                                        if (Array.isArray(result[k][i][k1][k2])) {
                                            for (let j = 0; j < result[k][i][k1][k2].length; j++) {
                                                const currentItem = result[k][i][k1][k2][j];
                                                if (typeof currentItem === "object" && Object.keys(currentItem).length > 0) {
                                                    const res3 = this.getAllFields(currentItem);
                                                    if (typeof res3 === "object" && Object.keys(res3).length > 0) {
                                                        result[k][i][k1][k2][j] = res3;
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }


        return result
    }


}

export default cms;