    await fs.appendFile(__dirname + '/DB/load.json',JSON.stringify(load)+",", function (err) {
                        if (err) {
                    res.status(500).send("Data not added try again");
                    return;
                }
                else
                {
                
                    return;
                }
                }); 