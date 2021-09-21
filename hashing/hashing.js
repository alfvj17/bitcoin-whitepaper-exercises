"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line);
}

function createBlock(_data) {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: _data,
		timestamp: Date.now() 
	};
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
	console.log(block);
	// return block
}

function verifyBlock(block) {
	if (block.index != 0) {
		if (!block.data) {
			console.log(1);
			return false;
		}
		else if (!block.prevHash) {
			console.log(2);
			return false;
		}
		else {
			let reHashBlock = {
				index: block.index,
				prevHash: block.prevHash,
				data: block.data,
				timestamp: block.timestamp 
			};		
			let reHash = blockHash(reHashBlock);
			if (block.hash != reHash) {
				console.log(block.hash + " " + reHash);
				return false;
			}
		}
	}
	else if (!Number.isInteger(block.index) || block.index < 0) {
		console.log(3);
		return false;
	}
	else {
		return true;
	}
}

function verifyChain() {
	for (let block of Blockchain.blocks) {
		if (!verifyBlock(block)) {
			return false;
		}
	return true;
	}
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);


// **********************************

function blockHash(bl) {
	// let block = JSON.stringify(bl);
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		`${bl.index};${bl.prevHash};${bl.data};${bl.timestamp};`
	).digest("hex");
}
