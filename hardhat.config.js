const dotenv = require("dotenv");

require("@nomicfoundation/hardhat-toolbox");

dotenv.config({ path: __dirname + "/.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
    },
  },
  networks: {
    localhost: {
        url: "http://127.0.0.1:8545",
        accounts: [process.env.SECRET, process.env.SECRET_2]
    },
    mumbai: {
        url: process.env.MUMBAI_URL,
        accounts: [process.env.SECRET_M, process.env.SECRET_M_2]
    },
    },
};
