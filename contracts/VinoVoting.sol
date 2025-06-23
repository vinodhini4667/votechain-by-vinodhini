// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VinoVoting {
    address public admin;
    bool public votingActive;

    struct Candidate { string name; uint voteCount; }

    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        votingActive = true;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    function vote(uint candidateIndex) public {
        require(votingActive, "Voting has ended");
        require(!hasVoted[msg.sender], "Already voted");
        require(candidateIndex < candidates.length, "Invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[candidateIndex].voteCount++;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function endVoting() public {
        require(msg.sender == admin, "Only admin can end voting");
        votingActive = false;
    }
}
