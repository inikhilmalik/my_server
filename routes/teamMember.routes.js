const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TeamMemberModel } = require("../models/teamMember.model");

const teamMemberRouter = express.Router();

teamMemberRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).send({ message: "Please enter al the feilds" });
    }

    const userExists = await TeamMemberModel.findOne({ email });
    if (userExists) {
      res.status(400).send("Team Member already exists")
    }
    else {
      bcrypt.hash(password, 1, async (err, hash) => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          const user = new TeamMemberModel({ ...req.body, password: hash });
          await user.save();
          res.status(200).send({ message: `Team Member Has Been Registered` });
        }
      });
    }
  }
  catch (err) {
    res.status(400).send({ error: err.message })
  }
})

teamMemberRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await TeamMemberModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email, please Signup first" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ userID: user._id }, "chatapp", { expiresIn: "12 hr" });
    res.status(200).send({
      message: "User logged in successfully",
      token,
      user
    });
  } catch (error) {
    res.status(400).send({
      message: "Something went wrong. Please try again later.",
    });
  }
});

teamMemberRouter.get("/getteam/:id", async (req, res) => {
  const {id}=req.params
  try {
    const users = await TeamMemberModel.find({ownerId:id});
    console.log(users)
    console.log(id)
    if (!users) {
      return res.status(200).send({ message: "no users" });
    }

    res.status(200).send(users);

  } catch (error) {
    res.status(400).send({
      message: "Something went wrong. Please try again later.",
    });
  }
});

teamMemberRouter.patch("/updatePermission/:id",async(req,res)=>{
  const {id}=req.params;
  // console.log(id)
  try{
      await TeamMemberModel.findByIdAndUpdate({_id:id},req.body);
      res.send("data is updated")
  }catch(err){
      res.send({"err":err.message})
  }
})

teamMemberRouter.delete("/deleteMember/:id",async(req,res)=>{
  const {id}=req.params;
  // console.log(id)
  try{
      await TeamMemberModel.findByIdAndDelete({_id:id});
      res.send("member is deleted")
  }catch(err){
      res.send({"err":err.message})
  }
})

module.exports = { teamMemberRouter }