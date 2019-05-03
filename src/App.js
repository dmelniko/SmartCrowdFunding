import React, { Component } from "react";
import web3 from "./web3";
import SmartCrowdFunding from "./SmartCrowdFunding";
import { Container, Card } from "semantic-ui-react";


class App extends Component {
  state = {
    value: "",
    ether:'',
    balance:'0',
    message: "",
    wei:'0',
    vote:'select',
    voteResult: 'still voting'

  };


    newSCF = async event => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting on transaction...' });

        await SmartCrowdFunding.methods.createCrowdSale(this.state.value).send({
            from: accounts[0]
        });

        this.setState({ message: 'Success' });
    };

    buyToken = async event => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting on transaction...' });

        await SmartCrowdFunding.methods.buyTokens().send({
            from: accounts[0], value: web3.utils.toWei(this.state.ether, 'ether')
        });

        this.setState({ message: 'Success' });
    };

    getBalance = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting on transaction...' });

        let balance =await SmartCrowdFunding.methods.getMyBalance().call({
            from: accounts[0]
        });
        this.setState({balance:balance});
        this.setState({ message: 'Success' });
    };

    getWei = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting on transaction...' });

        let wei =await SmartCrowdFunding.methods.weiRaised().call({
            from: accounts[0]
        });
        this.setState({wei:web3.utils.fromWei(wei, 'ether')});
        this.setState({ message: 'Success' });
    };

    startVote = async event => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting on transaction...' });

        await SmartCrowdFunding.methods.startVoting(this.state.percent).send({
            from: accounts[0]
        });

        this.setState({ message: 'Success' });
    };

    vote = async event =>  {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting on transaction...' });

        await SmartCrowdFunding.methods.vote(this.state.vote).send({
            from: accounts[0]
        });
        this.setState({ message: 'Success' });
    };

    endVote = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting on transaction...' });

        await SmartCrowdFunding.methods.endVote().send({
            from: accounts[0]
        });

        this.setState({ message: 'Success' });
    };

    getVoteResults = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({ message: 'Waiting on transaction...' });

        let result =await SmartCrowdFunding.methods.getVoteResults().call({
            from: accounts[0]
        });
        if(result){
            this.setState({ voteResult: 'Majority Agreed' });
        }
        else{
            this.setState({ voteResult: 'Majority Disagreed' });
        }
        this.setState({ message: 'Success' });
    };

  render() {
    return (<div>
            <h2>
                <p>This is a Smart Crowd Funding platform. </p>

            </h2>
            <form onSubmit={this.newSCF}>
                <h4>Create new crowd funding</h4>
                <div>
                    <label>Enter how many token per ether  </label>
                    <input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                    <button>Enter</button>
                </div>

            </form>
            <br/>
            <form onSubmit={this.buyToken}>
                <h4>Buy Tokens</h4>
                <div>
                    <label>Enter how much ether to spend  </label>
                    <input
                        value={this.state.ether}
                        onChange={event => this.setState({ ether: event.target.value })}
                    />
                    <button>Enter</button>
                </div>

            </form>

            <h4>View your balance </h4>
            <button onClick={this.getBalance}>View </button>
            <p>You have {this.state.balance} tokens</p>

            <h4>View funds raised so far </h4>
            <button onClick={this.getWei}>View </button>
            <p>So far we raised {this.state.wei} ether</p>

            <br/>
            <form onSubmit={this.startVote}>
                <h4>Start Voting</h4>
                <div>
                    <label>Enter percent of people that need to agree (1-99)  </label>
                    <input
                        value={this.state.percent}
                        onChange={event => this.setState({ percent: event.target.value })}
                    />
                    <button>Enter</button>
                </div>

            </form>

            <br/>

            <h4>Send Your Vote</h4>
            <select value={this.state.vote}
                    onChange={this.vote}
            >
                <option value="select">Select</option>
                <option value="true">Agree</option>
                <option value="false">Disagree</option>
            </select>
            <br/>

            <h4>End Voting</h4>
            <button onClick={this.endVote}>End Voting </button>
            <br/>

            <h4>View Voting Results</h4>
            <button onClick={this.getVoteResults}>View</button>
            <h5>Majority voters : {this.state.voteResult} </h5>
            <br/>

            <h1>{this.state.message}</h1>
        </div>


    );
  }
}

export default App;
