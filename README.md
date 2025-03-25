# SecretWhisper

<div align="center">
  <img src="public/logo.svg" alt="SecretWhisper Logo" width="200" height="200" />
  
  <h1>SecretWhisper</h1>
  <p>Secure. Private. Decentralized.</p>

  <p align="center">
    <a href="https://secretwhisper.xyz">View Demo</a>
    ·
    <a href="https://github.com/SecretWhisperxyz/SecretWhisper/issues">Report Bug</a>
    ·
    <a href="https://github.com/SecretWhisperxyz/SecretWhisper/issues">Request Feature</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/github/license/SecretWhisperxyz/SecretWhisper" alt="License" />
    <img src="https://img.shields.io/github/stars/SecretWhisperxyz/SecretWhisper" alt="Stars" />
    <img src="https://img.shields.io/github/forks/SecretWhisperxyz/SecretWhisper" alt="Forks" />
  </p>
</div>

## 📋 Table of Contents

- [About The Project](#about-the-project)
  - [Key Features](#key-features)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Development Mode](#development-mode)
  - [Production Deployment](#production-deployment)
- [Architecture](#architecture)
  - [Smart Contracts](#smart-contracts)
  - [Frontend](#frontend)
  - [Encryption](#encryption)
- [Security](#security)
  - [Encryption Protocol](#encryption-protocol)
  - [Smart Contract Security](#smart-contract-security)
  - [Privacy Features](#privacy-features)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 🚀 About The Project

SecretWhisper is a cutting-edge decentralized communication platform that combines blockchain technology with state-of-the-art encryption to provide secure, private messaging. Built on Solana, it ensures that your conversations remain confidential and tamper-proof while benefiting from high speed and low transaction costs.

### ✨ Key Features

- **End-to-End Encryption**
  - Perfect forward secrecy
  - Military-grade AES-256 encryption
  - Secure key exchange using ECDH
  
- **Smart Contract-Based Messaging**
  - Immutable message history
  - Decentralized channel management
  - Automated message verification on Solana
  
- **Advanced Privacy**
  - No message metadata storage
  - Anonymous channel creation
  - Private key management
  
- **User Experience**
  - Intuitive interface
  - Real-time message updates
  - Cross-platform support
  - File sharing capabilities
  
- **Group Chat Features**
  - Secure group creation
  - Member management
  - Group encryption

### 🛠️ Built With

- **Frontend**
  - [Next.js](https://nextjs.org/) - React framework
  - [Material-UI](https://mui.com/) - UI components
  - [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/) - Solana JavaScript API
  
- **Smart Contracts**
  - [Rust](https://www.rust-lang.org/) - Smart contract language
  - [Anchor](https://www.anchor-lang.com/) - Solana development framework
  - [Solana Program Library](https://spl.solana.com/) - Standard program library
  
- **Testing & Quality**
  - [Mocha](https://mochajs.org/) - Test runner
  - [Chai](https://www.chaijs.com/) - Testing framework
  - [Anchor Testing Framework](https://www.anchor-lang.com/docs/testing) - Program testing

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- [Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools)
- [Phantom](https://phantom.app/) or other Solana wallet
- Rust and Cargo
- Git

```bash
# Check Node.js version
node --version

# Install Yarn if not installed
npm install -g yarn

# Install Solana CLI tools
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"

# Install Anchor CLI
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/SecretWhisperxyz/SecretWhisper.git
cd SecretWhisper
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=
```

### Development Mode

```bash
# Start local Solana validator
solana-test-validator

# Build and deploy program (in a new terminal)
anchor build
anchor deploy

# Start development server
yarn dev
```

### Production Deployment

1. Build the application
```bash
yarn build
```

2. Deploy program to Solana network
```bash
anchor deploy --provider.cluster devnet  # For devnet
anchor deploy --provider.cluster mainnet  # For mainnet
```

## 🏗️ Architecture

### Smart Contracts

The project uses several Solana programs:

- `secret_whisper.rs`: Main messaging program
- `group_chat.rs`: Group messaging functionality
- `file_sharing.rs`: File sharing capabilities

### Encryption Protocol

1. **Message Encryption**
   - AES-256-GCM for message content
   - ECDH for key exchange
   - Perfect forward secrecy per message

2. **File Encryption**
   - Chunked encryption for large files
   - Secure key distribution
   - Decentralized storage integration

## 🔒 Security

### Smart Contract Security

- Comprehensive test coverage
- External audit completed
- Regular security updates
- Transaction optimization for Solana

### Privacy Features

- No message content stored on-chain
- Encrypted metadata
- Anonymous channel creation
- Secure key management

## 🗺️ Roadmap

- [x] Basic messaging functionality
- [x] End-to-end encryption
- [x] Group chat support
- [x] File sharing
- [ ] Voice messages
- [ ] Video calls
- [ ] Mobile applications
- [ ] Cross-chain messaging with Wormhole

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## 🙏 Acknowledgments

- [Solana Foundation](https://solana.com/) for blockchain infrastructure
- [Anchor Framework](https://www.anchor-lang.com/) for development tools
- [Material-UI](https://mui.com/) for UI components
- All contributors and supporters

---

<div align="center">
  Made with ❤️ by the SecretWhisper Team
</div> 