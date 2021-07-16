function isEmpty(value)
{
    if(value==''||value==undefined)
    {
        return true;
    }
    else
    {
        return false;
    }
}
async function CheckInsertData(body) {
    return new Promise(async (resolve,reject)=>
    {  
        if(Object.keys(body).length==0)
        {
             reject({
                "statusCode":"400",
                "message":"body must have value"
            });
            return;
        }
        // Object.keys(body).forEach(element => {
        //     if(isEmpty(body[element]))
        //     {
        //         return reject({
        //             "statusCode":"400",
        //             "message":`empty value not allowed in ${body[element]}`
        //         })
        //     }
        // });
  });
  }
module.exports={CheckInsertData,isEmpty}