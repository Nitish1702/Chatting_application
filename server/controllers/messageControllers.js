const Messages = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;

    const newMsg = await Messages.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });

    if (newMsg) return res.json({ message: "message added successfully" });
    else return res.json({ message: "faild to add msg to db" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const msgs = await Messages.find({ users: { $all: [from, to] } }).sort({
      updatedAt: 1,
    });

    const labeledmsgs = msgs.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        content: msg.message.text,
      };
    });

    return res.json(labeledmsgs);
  } catch (err) {
    console.log(err);
  }
};
