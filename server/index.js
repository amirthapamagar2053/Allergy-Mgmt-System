const app = require("./app"); // the actual Express application
const { connectToDatabase } = require("./utils/db");

const PORT = process.env.PORT || 3001;

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
