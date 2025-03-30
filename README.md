# SecretWhisper

<div align="center">
  <img src="public/logo.svg" alt="SecretWhisper Logo" width="200" height="200" />
  
  <h1>SecretWhisper</h1>
  <p>Secure. Private. Decentralized.</p>

  <p align="center">
    <a href="https://www.secretwhisper.xyz">View Demo</a>
    ·
    <a href="https://github.com/SecretWhisperai/SecretWhisper/issues">Report Bug</a>
    ·
    <a href="https://github.com/SecretWhisperai/SecretWhisper/issues">Request Feature</a>
  </p>

  <p align="center">
    <a href="https://twitter.com/SecretWhisper_A">
      <img src="https://img.shields.io/twitter/follow/SecretWhisper_A?style=social" alt="Twitter Follow" />
    </a>
    <a href="https://github.com/SecretWhisperai/SecretWhisper">
      <img src="https://img.shields.io/github/stars/SecretWhisperai/SecretWhisper?style=social" alt="GitHub Stars" />
    </a>
  </p>

  <p align="center">
    🌐 <a href="https://www.secretwhisper.xyz">Official Website</a>
  </p>
</div>

## 🔑 Overview

SecretWhisper is a revolutionary decentralized anonymous social platform built on Solana blockchain. It enables users to express their thoughts securely and privately through encrypted messaging, emotion tagging, and time-delayed message delivery.

### Key Features

- **Anonymous Messaging**: Send completely anonymous messages to any crypto wallet address
- **Encrypted Garden**: Private space where only authorized messages can be displayed
- **Voice Tokens**: Messages are minted as unique NFTs with privacy controls
- **Emotion Tags**: Express feelings through categorized message tags
- **Time Capsule**: Schedule messages for future delivery
- **Blockchain Verification**: Immutable message confirmation and authenticity

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Client Applications                          │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │   Web dApp      │   │   Mobile App    │   │   Admin Portal  │   │
│   │   (Next.js)     │   │   (Coming Soon) │   │   (Protected)   │   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Solana Programs                              │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │  Message Core   │   │   NFT System    │   │   Time Lock     │   │
│   │  Program        │   │   Program       │   │   Program       │   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     Security & Privacy Layer                        │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │  End-to-End     │   │  Zero-Knowledge │   │   Key           │   │
│   │  Encryption     │   │  Proofs         │   │   Management    │   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└────────────────────────────────┬────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Storage Layer                               │
│                                                                     │
│   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   │
│   │   Encrypted     │   │    Metadata     │   │   Message       │   │
│   │   Content       │   │    Storage      │   │   Index        │   │
│   └─────────────────┘   └─────────────────┘   └─────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## 💻 Technical Stack

### Frontend
- **Framework**: Next.js with React
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI
- **Wallet Integration**: Solana Wallet Adapter
- **Encryption**: Web Crypto API

### Blockchain
- **Network**: Solana
- **Programs**: Rust with Anchor Framework
- **Token Standards**: SPL Token & Metaplex NFT
- **Testing**: Mocha & Chai

### Security
- **Encryption**: AES-256-GCM
- **Key Exchange**: ECDH
- **Privacy**: Zero-knowledge proofs
- **Storage**: Encrypted distributed storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Rust and Cargo
- Solana Tool Suite
- Anchor Framework
- Phantom Wallet

### Installation

```bash
# Install Solana
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"

# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force

# Clone repository
git clone https://github.com/SecretWhisperai/SecretWhisper.git
cd SecretWhisper

# Install dependencies
yarn install

# Set up environment
cp .env.example .env

# Start development
yarn dev
```

## 📊 Core Features

### Messaging System

1. **Anonymous Messaging**
   - Wallet-to-wallet messaging
   - End-to-end encryption
   - Metadata privacy

2. **Voice Tokens**
   - NFT message minting
   - Privacy controls
   - Transferable ownership

3. **Time Capsule**
   - Future message scheduling
   - Automatic delivery
   - Timestamp verification

4. **Emotion Tagging**
   - Categorized expressions
   - Sentiment analysis
   - Tag-based filtering

## 🔒 Security Framework

### 1. Message Security
- End-to-end encryption
- Forward secrecy
- Metadata protection

### 2. Privacy Features
- Anonymous channels
- Zero-knowledge proofs
- Private key management

### 3. Platform Security
- Smart contract audits
- Regular security updates
- Incident response plan

## 💎 Tokenomics

### $WHISP Token
- **Total Supply**: 1 Billion
- **Use Cases**:
  - Message fee payment
  - Governance participation
  - Platform revenue sharing
  - Feature access

### Token Distribution
- Platform Development: 30%
- Community Rewards: 25%
- Team & Advisors: 20%
- Public Sale: 15%
- Reserve: 10%

## 🗺️ Roadmap

### Phase 1: Seed (Current)
- [x] Core messaging functionality
- [x] Basic encryption
- [x] Smart contract deployment
- [x] Initial security audit

### Phase 2: Sprout
- [ ] Enhanced privacy features
- [ ] Mobile application
- [ ] Voice token marketplace
- [ ] Community governance

### Phase 3: Growth
- [ ] Advanced encryption
- [ ] Cross-chain integration
- [ ] Enterprise solutions
- [ ] Ecosystem expansion

### Phase 4: Bloom
- [ ] Full DAO governance
- [ ] Developer API
- [ ] Global expansion
- [ ] Strategic partnerships

## 📖 Documentation

- [User Guide](docs/user-guide.md)
- [Developer Docs](docs/developer.md)
- [API Reference](docs/api.md)
- [Security](docs/security.md)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ by the SecretWhisper Team
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
git clone https://github.com/SecretWhisperai/SecretWhisper.git
cd SecretWhisper
```