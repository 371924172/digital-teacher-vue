export function formatTag(id, ptagList) {
    if (ptagList) {
        if (id) {
            // var tag = ptagList.find((t) => {
            //     return t.id == id;
            // });
            // return tag.name;
            return ptagList.find((t) => { return t.id == id; }).name;
        } else return "尚未分配标签";
    }
}