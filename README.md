# Music-Users-API
exports.deleteStuff = async (req, res) => {
  try {
    await Album.find().deleteMany();
    res.json("Deleted");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
