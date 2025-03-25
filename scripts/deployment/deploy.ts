import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  // Deploy SecretWhisper contract
  const SecretWhisper = await ethers.getContractFactory("SecretWhisper");
  const secretWhisper = await SecretWhisper.deploy();
  await secretWhisper.deployed();
  console.log("SecretWhisper deployed to:", secretWhisper.address);

  // Deploy GroupChat contract
  const GroupChat = await ethers.getContractFactory("GroupChat");
  const groupChat = await GroupChat.deploy();
  await groupChat.deployed();
  console.log("GroupChat deployed to:", groupChat.address);

  // Update environment files
  const envFiles = [".env", ".env.development", ".env.production"];
  const contracts = {
    NEXT_PUBLIC_SECRET_WHISPER_ADDRESS: secretWhisper.address,
    NEXT_PUBLIC_GROUP_CHAT_ADDRESS: groupChat.address
  };

  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      let envContent = fs.readFileSync(file, "utf8");
      for (const [key, value] of Object.entries(contracts)) {
        const regex = new RegExp(`${key}=.*`);
        if (envContent.match(regex)) {
          envContent = envContent.replace(regex, `${key}=${value}`);
        } else {
          envContent += `\n${key}=${value}`;
        }
      }
      fs.writeFileSync(file, envContent);
      console.log(`Updated ${file} with contract addresses`);
    }
  }

  // Save deployment artifacts
  const deploymentPath = path.join(__dirname, "../../deployments");
  if (!fs.existsSync(deploymentPath)) {
    fs.mkdirSync(deploymentPath, { recursive: true });
  }

  const deployment = {
    timestamp: new Date().toISOString(),
    network: network.name,
    contracts: {
      SecretWhisper: secretWhisper.address,
      GroupChat: groupChat.address
    }
  };

  fs.writeFileSync(
    path.join(deploymentPath, `${network.name}.json`),
    JSON.stringify(deployment, null, 2)
  );
  console.log("Deployment information saved");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 