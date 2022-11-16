let express=require("express")
let router =express.Router();
 

const { setLoadConfirmationDoc ,getload} = require('./../DB/load')

router.post("/load",async (req,res)=>{

    console.log("new load comes");

    let load = req.body;

    try {
        await setLoadConfirmationDoc(load).then((d) => {
            console.log(d);
            res.status(200).send("Added");
            return;
        }).catch((err) => {
            res.status(500).send("Data not added try again");
            return;
        })
    } catch {
        res.status(500).send("Not Added Try again");
        return;
    }
    
})

module.exports=router;
