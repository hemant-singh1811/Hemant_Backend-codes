let express=require("express")
let router =express.Router();

const { setLoadConfirmationDoc ,getload} = require('/Users/hemantsingh/code/host/DB/load')

router.post("/load",async (req,res)=>{

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
