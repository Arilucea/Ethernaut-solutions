# Ethernaut solutions
Solution to the etherenaut levels using hardhat

# Respository structure
```bash
    ├── Levels                        # Contracts and scripts to solve the levels
    │   ├── contracts                 # Solidity code
    │   │   ├── LXX_LevelName         # Each level contract solution
    │   ├── scripts                   # JS code to deploy and execute the solution
    │   │   ├── LXX_LevelName         # Each level script solution
    ├── .env
    ├── hardhat.config.js
    ├── package.json                    
    └── README.md
```

# How to use
1. Clone the repo.

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a file called `.env` in the root of the repo that contains the addresses PK and RPC endpoints of the network.
    ```bash
    MUMBAI_URL="https://rpc..."
    SECRET="0x...."
    SECRET_2="0x...."
    SECRET_M="0x...."
    SECRET_M_2="0x...."
    ```
4. Get a level instance in ethernaut

5. Replace in `Levels/scripts/Addresses.json` the address of the level with your instance address.

4. Execute solution script:
    ```bash
    npx hardhat run --network <networkname> Levels/scripts/<LevelNameFolder>/<LevelNameScript>.js
    ```
    Example
    ```bash
    npx hardhat run --network mumbai Levels/scripts/L01_Fallback/Fallback.js
    ```

5. Wait until end message is print in the console.
    ```bash
    ----------End---------- 0x...
    ```
6. Submit ethernaut instance.