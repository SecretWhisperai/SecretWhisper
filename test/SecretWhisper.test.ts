import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { SecretWhisper } from "../typechain-types";

describe("SecretWhisper", function () {
    let secretWhisper: SecretWhisper;
    let owner: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        const SecretWhisperFactory = await ethers.getContractFactory("SecretWhisper");
        secretWhisper = await SecretWhisperFactory.deploy();
        await secretWhisper.deployed();
    });

    describe("Channel Creation", function () {
        it("Should create a new channel", async function () {
            const tx = await secretWhisper.connect(user1).createChannel(user2.address);
            const receipt = await tx.wait();
            const event = receipt.events?.find(e => e.event === "ChannelCreated");
            
            expect(event).to.not.be.undefined;
            expect(event?.args?.creator).to.equal(user1.address);
            expect(event?.args?.participant).to.equal(user2.address);
        });

        it("Should not allow creating channel with self", async function () {
            await expect(
                secretWhisper.connect(user1).createChannel(user1.address)
            ).to.be.revertedWith("Cannot create channel with self");
        });

        it("Should not allow creating channel with zero address", async function () {
            await expect(
                secretWhisper.connect(user1).createChannel(ethers.constants.AddressZero)
            ).to.be.revertedWith("Invalid participant address");
        });
    });

    describe("Messaging", function () {
        let channelId: string;

        beforeEach(async function () {
            const tx = await secretWhisper.connect(user1).createChannel(user2.address);
            const receipt = await tx.wait();
            channelId = receipt.events?.find(e => e.event === "ChannelCreated")?.args?.channelId;
        });

        it("Should allow sending messages in channel", async function () {
            const message = ethers.utils.toUtf8Bytes("Hello, World!");
            const tx = await secretWhisper.connect(user1).sendMessage(channelId, message);
            const receipt = await tx.wait();
            const event = receipt.events?.find(e => e.event === "MessageSent");
            
            expect(event).to.not.be.undefined;
            expect(event?.args?.sender).to.equal(user1.address);
            expect(event?.args?.channelId).to.equal(channelId);
        });

        it("Should not allow non-participants to send messages", async function () {
            const message = ethers.utils.toUtf8Bytes("Hello, World!");
            await expect(
                secretWhisper.connect(owner).sendMessage(channelId, message)
            ).to.be.revertedWith("Not a channel participant");
        });

        it("Should not allow sending empty messages", async function () {
            await expect(
                secretWhisper.connect(user1).sendMessage(channelId, [])
            ).to.be.revertedWith("Empty message");
        });
    });

    describe("Channel Management", function () {
        let channelId: string;

        beforeEach(async function () {
            const tx = await secretWhisper.connect(user1).createChannel(user2.address);
            const receipt = await tx.wait();
            channelId = receipt.events?.find(e => e.event === "ChannelCreated")?.args?.channelId;
        });

        it("Should allow closing channel", async function () {
            const tx = await secretWhisper.connect(user1).closeChannel(channelId);
            const receipt = await tx.wait();
            const event = receipt.events?.find(e => e.event === "ChannelClosed");
            
            expect(event).to.not.be.undefined;
            expect(event?.args?.channelId).to.equal(channelId);

            const channel = await secretWhisper.channels(channelId);
            expect(channel.isActive).to.be.false;
        });

        it("Should not allow sending messages in closed channel", async function () {
            await secretWhisper.connect(user1).closeChannel(channelId);
            const message = ethers.utils.toUtf8Bytes("Hello, World!");
            
            await expect(
                secretWhisper.connect(user1).sendMessage(channelId, message)
            ).to.be.revertedWith("Channel is not active");
        });

        it("Should list user channels correctly", async function () {
            const channels = await secretWhisper.getUserChannels(user1.address);
            expect(channels).to.have.lengthOf(1);
            expect(channels[0]).to.equal(channelId);
        });
    });
}); 