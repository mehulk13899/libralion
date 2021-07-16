
async function Select(query) {
    return new Promise(async (resolve,reject)=>
    {  
        
        const client = await pool.connect((err, client, release)=>{
            if (err) {
             reject(err);
            }
            else
            {
             client.query(query,(err, result) => {
               client.release()
               if (err) {
                 resolve(err);
               }
               reject(result);
             });
            }}
           );      
      
  });
  }
module.exports={Select}