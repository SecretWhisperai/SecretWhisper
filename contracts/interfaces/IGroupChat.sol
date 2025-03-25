// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IGroupChat {
    struct Group {
        string name;
        address creator;
        uint256 createdAt;
        bool isActive;
        uint256 memberCount;
    }

    struct GroupMessage {
        address sender;
        bytes content;
        uint256 timestamp;
        bool isDeleted;
    }

    event GroupCreated(
        bytes32 indexed groupId,
        string name,
        address indexed creator,
        uint256 timestamp
    );

    event GroupMessageSent(
        bytes32 indexed groupId,
        address indexed sender,
        uint256 timestamp
    );

    event GroupMemberAdded(
        bytes32 indexed groupId,
        address indexed member,
        uint256 timestamp
    );

    event GroupMemberRemoved(
        bytes32 indexed groupId,
        address indexed member,
        uint256 timestamp
    );

    function createGroup(string calldata name) external returns (bytes32);
    
    function joinGroup(bytes32 groupId) external;
    
    function leaveGroup(bytes32 groupId) external;
    
    function sendGroupMessage(bytes32 groupId, bytes calldata content) external;
    
    function deleteGroupMessage(bytes32 groupId, uint256 messageIndex) external;
    
    function getGroupMessages(bytes32 groupId) external view returns (GroupMessage[] memory);
    
    function getGroupInfo(bytes32 groupId) external view returns (Group memory);
    
    function getGroupMembers(bytes32 groupId) external view returns (address[] memory);
    
    function isGroupMember(bytes32 groupId, address member) external view returns (bool);
} 