// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SecretWhisper {
    struct Message {
        address sender;
        bytes encryptedContent;
        uint256 timestamp;
        bool isRead;
    }

    struct Channel {
        address creator;
        address participant;
        bool isActive;
        uint256 createdAt;
    }

    mapping(bytes32 => Channel) public channels;
    mapping(bytes32 => Message[]) private messages;
    mapping(address => bytes32[]) public userChannels;

    event ChannelCreated(bytes32 indexed channelId, address indexed creator, address indexed participant);
    event MessageSent(bytes32 indexed channelId, address indexed sender, uint256 timestamp);
    event ChannelClosed(bytes32 indexed channelId);

    modifier onlyParticipant(bytes32 channelId) {
        require(
            channels[channelId].creator == msg.sender || 
            channels[channelId].participant == msg.sender,
            "Not a channel participant"
        );
        _;
    }

    function createChannel(address participant) external returns (bytes32) {
        require(participant != address(0), "Invalid participant address");
        require(participant != msg.sender, "Cannot create channel with self");

        bytes32 channelId = keccak256(
            abi.encodePacked(
                msg.sender,
                participant,
                block.timestamp
            )
        );

        require(channels[channelId].creator == address(0), "Channel already exists");

        channels[channelId] = Channel({
            creator: msg.sender,
            participant: participant,
            isActive: true,
            createdAt: block.timestamp
        });

        userChannels[msg.sender].push(channelId);
        userChannels[participant].push(channelId);

        emit ChannelCreated(channelId, msg.sender, participant);
        return channelId;
    }

    function sendMessage(bytes32 channelId, bytes calldata encryptedContent) 
        external 
        onlyParticipant(channelId) 
    {
        require(channels[channelId].isActive, "Channel is not active");
        require(encryptedContent.length > 0, "Empty message");

        messages[channelId].push(Message({
            sender: msg.sender,
            encryptedContent: encryptedContent,
            timestamp: block.timestamp,
            isRead: false
        }));

        emit MessageSent(channelId, msg.sender, block.timestamp);
    }

    function getMessages(bytes32 channelId) 
        external 
        view 
        onlyParticipant(channelId) 
        returns (Message[] memory) 
    {
        return messages[channelId];
    }

    function closeChannel(bytes32 channelId) 
        external 
        onlyParticipant(channelId) 
    {
        require(channels[channelId].isActive, "Channel already closed");
        channels[channelId].isActive = false;
        emit ChannelClosed(channelId);
    }

    function getUserChannels(address user) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        return userChannels[user];
    }
} 