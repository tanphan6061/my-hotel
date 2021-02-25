const status = require('http-status');

const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');

module.exports.getRoom = async (req, res) => {
  const { hotelId } = req.params;

  const rooms = await Room.find({ hotel: hotelId });

  return res.json({ rooms });
};

module.exports.createRoom = async (req, res) => {
  const {
    name,
    views,
    hotel,
    equipments,
    area,
    quantity,
    people,
    price,
  } = req.body;

  if (req.files.length < 1) {
    console.log('hehe');
    return res.status(status.BAD_REQUEST).json({
      message: 'Bạn chưa chọn ảnh cho phòng',
    });
  }

  try {
    const roomId = await Room.create({
      name,
      hotel,
      equipments,
      area,
      quantity,
      people,
      views,
      price,
      images: req.files.map((item) => item.path),
    });
    await Hotel.findByIdAndUpdate(
      hotel,
      { $push: { rooms: roomId } },
      { new: true, upsert: true }
    );

    const room = await Room.findById(roomId).populate('hotel', '-rooms');
    // .populate('equipments');

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.editRoom = async (req, res) => {
  const {
    id,
    name,
    hotel,
    equipments,
    area,
    quantity,
    people,
    price,
    views,
  } = req.body;

  const roomExist = await Room.findById(id);

  if (!roomExist) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: 'The room is not existing.' });
  }

  try {
    await Room.findByIdAndUpdate(id, {
      name,
      hotel,
      equipments,
      area,
      quantity,
      people,
      price,
      views,
    });

    const room = await Room.findById(id).populate('hotel', '-rooms');
    // .populate('equipments');

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.deleteRoom = async (req, res) => {
  const { roomId } = req.body;

  try {
    await Room.findByIdAndDelete({ _id: roomId });

    return res.json({ id: roomId });
  } catch (err) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

module.exports.getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    if (!room) {
      return res
        .status(status.BAD_REQUEST)
        .json({ message: 'The room is not existing.' });
    }
    return res.json(room);
  } catch (err) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
