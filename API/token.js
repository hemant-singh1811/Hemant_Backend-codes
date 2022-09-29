let express=require("express")
let router =express.Router();



route.post("/token", async (req, res) => {
    const { user_id } = req.body;
    try {
      const token = await chatClient.createToken(user_id.toString());
      res.status(200).json({
        token: token,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
});

module.exports={
    route
}