const { v4: uuidv4 } = require("uuid");
const { User, Room } = require("../models");

function format(user) {
  const { id, username, isAdmin } = user;
  return {
    id,
    username,
    accessToken: user.generateToken(),
    isAdmin,
    message: "Anda berhasil login",
  };
}

module.exports = {
  signUp: async (req, res) => {
    try {
      await User.register(req.body);
      res.status(201).json({ message: "Register berhasil, silahkan login" });
    } catch (error) {
      res.status(400).json({ message: "Periksa kembali data data register anda" });
    }
  },
  signIn: async (req, res) => {
    try {
      const user = await User.authenticate(req.body);
      res.status(200).json(format(user));
    } catch (error) {
      res.status(400).json({ message: "Periksa kembali data data login anda" });
    }
  },
  whoAmi: (req, res) => {
    const currentUser = req.user;
    res.status(200).json(currentUser);
  },
  createRoom: async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      const room = await Room.create({
        id: uuidv4(),
        playerOneId: user.id,
      });
      res.status(201).json({
        message: `Berhasil generate room dengan id : ${room.id}`,
        room,
      });
    } catch (error) {
      res.status(400).json({
        message: "userId tidak ditemukan",
        token_acces: "anda tidak memiliki token, silahkan login untuk mendapatkan token",
      });
    }
  },
  viewDataRoom: async (req, res) => {
    try {
      const room = await Room.findOne({ where: { id: req.params.id } });
      res.status(200).json(room);
    } catch (error) {
      res.status(400).json({ message: "Id room tidak ditemukan" });
    }
  },
  joinRoom: async (req, res) => {
    try {
      await Room.update(
        {
          playerTwoId: req.body.playerTwoId,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json({ message: "berhasil join room" });
    } catch (error) {
      res.status(400).json({ message: "Gagal join room" });
    }
  },
  battleGame: async (req, res) => {
    try {
      const matchRoom = await Room.findOne({ where: { id: req.body.roomId } });
      const player = await wichPlayer(req.body.userId, req.body.roomId);
      if (player == "player 1") {
        res.status(201).json({matchInfo: req.body.hand, matchRoom})
      } else if (player == "player 2") {
        res.status(201).json({matchInfo: req.body.hand, matchRoom})
      }
    } catch (error) {
      res.status(401).json({message: "userId dari player tidak ditemukan"});
    }
  },
  getResult: async (req, res) => {
    try {
      let matchRoom = await Room.findOne({ where: { id: req.body.id } });
      let matchInfo = matchRoom.matchInfo;
      let winner = "";
      switch (req.body.round) {
        case 1:
          winner = getWinner(matchInfo.slice(0, 2));
          break;
        case 2:
          winner = getWinner(matchInfo.slice(2, 4));
          break;
        case 1:
          winner = getWinner(matchInfo.slice(4, 6));
          break;
        default:
          break;
      }
    if (winner != "") {
      res.json({ message: winner });
    } else {
      res.json({ message: "error" });
    }
    } catch (error) {
      res.json(error)
    }
  }
};

async function wichPlayer(id, roomId) {
  const matchRoom = await Room.findOne({ where: { id: roomId } });
  if (matchRoom == null || matchRoom == 0) {
    return "not found";
  }
  if (id == matchRoom.playerOneId) {
    return "player 1";
  } else if (id == matchRoom.playerTwoId) {
    return "player 2";
  } else {
    return "not found";
  }
}

function getWinner(matchSet) {
  matchstring = matchSet.json("");
  switch (matchstring) {
    case "RR":
    case "PP":
    case "SS":
      return "Draw";
    case "RS":
    case "SP":
    case "PR":
      return "Player 1 win";
    case "SR":
    case "PS":
    case "RP":
      return "Player 2 win";
    default:
      return "Match belum selesai";
  }
}
