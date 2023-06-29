# Music-Users-API
<dev>exports.deleteStuff = async (req, res) => {
  try {
    await Album.find().deleteMany();
    res.json("Deleted");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).send("User not found.");
    } else if (req.user.loggedIn === false) {
      res.status(400).send("User not logged in");
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(
        `Are you sure you want to delete user ${req.user.username}? (Case Sensative: YES/NO)`,
        async (confirmation) => {
          rl.close();
          if (confirmation === "YES") {
            await req.user.deleteOne();
            res
              .status(400)
              .send({
                message: `User '${req.user.username}' has been deleted.`,
              });
          } else {
            res.status(400).send("User Deletion Cancelled");
          }
        }
      );
    }
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
</dev>