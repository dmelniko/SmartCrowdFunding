pragma solidity ^0.5.2;

import './CrowdCoin.sol';

contract Voting {

    // describes a Voter, which has an id and what they voted for
    struct Voter {
        bytes32 uid;
        bool vote;
    }

    CrowdCoin token;
    bool started;
    uint numVoters;
    mapping(uint => Voter) voters;

    function startVote(address _token) public {
        token = CrowdCoin(_token);
        started = true;
    }

    function vote(bytes32 uid, bool voteFor) public {
        require(started);

        // checks if the struct exists for that candidate
        uint voterID = numVoters++; //voterID is the return variable
        voters[voterID] = Voter(uid, voteFor);
    }

    function totalVotes() view public returns (uint) {
        uint numOfVotes = 0;
        for (uint i = 0; i < numVoters; i++) {
            if(voters[i].vote) {
                numOfVotes++;
            }
        }
        return numOfVotes;
    }

    function getNumOfVoters() public view returns(uint) {
        return numVoters;
    }
}