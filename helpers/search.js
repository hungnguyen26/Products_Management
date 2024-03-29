module.exports = (query)=>{
    let objectSearch = {
        keyword:"",
        regex:""
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;

        const regex = new RegExp(objectSearch.keyword,"i");   // i không phân biệt chữ hoa thường

        objectSearch.regex = regex; 
    }
    return objectSearch;
}