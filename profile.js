const express=require("express")
const {run}=require("./database.js")

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const db=await run()
        const user=req.session?.username || null
        if (!user) {
            return res.status(401).json({ message: "Not logged in" });
          }
        const posts=db.collection("posts")
        const plans=db.collection("plans")
        const post=await posts.find({username:user}).toArray()
        const plan=await plans.find({username:user}).toArray()

        res.json({
            username:user,
            posts: post,
            plans: plan
        })
    } catch(err){
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

module.exports=router