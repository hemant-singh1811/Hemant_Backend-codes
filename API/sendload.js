let express = require("express")
let router = express.Router();
let socket=require('socket.io')

const {getload} = require('./../DB/load')

const {io} = require('./../server.js')

let driver_user_id=[
    {
        driverid:'vinay',
        stream_user_id:'vinay'
    },
    {
        driverid:'rishabh',
        stream_user_id:'rishabh'
    },
    {
        driverid:'sumit',
        stream_user_id:'sumit'
    }
]

router.post("/", async (req, res) => {
    
    let driverid = req.body.driverid;
    let loadnumber = req.body.loadnumber;

    try {
        let found = false;
        await getload(loadnumber).then(async (load) => {
            await driver_user_id.forEach(async (element) => {

                if (element.driverid == driverid) {
                    found = true;
                    console.log(element.stream_user_id);
                    await io.to(element.stream_user_id).emit("assignload", load)
                    return res.send("load sended to assign driver")
                }

            });
        }).catch((err) => {
            return res.status(404).send("load number not found");
            return;
        })
        if (!found) {
            return res.status(404).send("driver id not found");
        }
    } catch {
        res.status(403).send("try again");
        return;
    }

})

module.exports =router
