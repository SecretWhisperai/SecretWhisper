// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SecretWhisper {
    struct Message {
        address sender;
        bytes encryptedContent;
        uint256 timestamp;
    }

    mapping(address => Message[]) private messages;
    mapping(address => mapping(address => bool)) private authorized;

    event MessageSent(address indexed from, address indexed to);
    event AuthorizationChanged(address indexed from, address indexed to, bool status);

    function sendMessage(address _to, bytes calldata _encryptedContent) external {
        require(_to != address(0), "Invalid recipient address");
        require(_to != msg.sender, "Cannot send message to self");
        require(authorized[_to][msg.sender], "Not authorized to send message");

        messages[_to].push(Message({
            sender: msg.sender,
            encryptedContent: _encryptedContent,
            timestamp: block.timestamp
        }));

        emit MessageSent(msg.sender, _to);
    }

    function authorize(address _address, bool _status) external {
        require(_address != address(0), "Invalid address");
        require(_address != msg.sender, "Cannot authorize self");
        
        authorized[msg.sender][_address] = _status;
        emit AuthorizationChanged(msg.sender, _address, _status);
    }

    function getMessages() external view returns (Message[] memory) {
        return messages[msg.sender];
    }

    function isAuthorized(address _from) external view returns (bool) {
        return authorized[msg.sender][_from];
    }
} 