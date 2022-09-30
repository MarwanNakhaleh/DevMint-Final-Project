# Module 4 Evaluation - Building a Frontend to Module 3 Evaluation Answer
This evaluation will be building on the work you previously did for Eval 3. As a reminder, for Eval 3, you built a custom contract to allow a user to sell an NFT on a blockchain and have others bid on the contract via ERC20 tokens. We're going to take that contract and build out a robust UI to allow users to interact directly with the contract with their browser and Metamask Wallet.

To start, please clone your Module 3 evaluation answer into a new repository and rename it to be the Module 4 evaluation. Then review all of the evaluation details below before continuing.

## Project Description
The project should be a general UI that allows anyone with a contract address that is using the Module 3 Auction Style contract to interact with all of the features. The UI should be able to accept multiple contracts and create separate interfaces to allow them to see the details of the contract and sale.

Within each individual auction, the user should be able to see the following details:
* The NFT that is on sale
* The ERC20 token that is being bid with
* If the auction has been started
* How much time is left in the auction to bid
* The address of the current max bidder, as well as how many tokens they have bid (in ETH units)
* Whether the auction has been finalized

When users interact with the contract, they should have the ability to make a bid, allowing them to choose how many tokens (in ETH units) they wish to bid. If they did not fit one of the requirements of the contract (for example, not giving approval to the contract for tokens), then a human readable error should be presented to the user.

When the auction is completed, the owner of the contract should have their own buttons to be able to finalize the auction. If the requirements for the auction have not been met (for example, the auction time has not elapsed), then they should have a human readable prompt telling them what the problem is.

## Part #1 - Building the UI
The UI will have the following properties

* The website should have a Title and an explanation of what the website allows users to do
* The website should have a prompt allowing the users to add new contracts on their blockchain of choice, allowing them to then interact with that contract
* If the contract is not a valid Auction contract (it does not have the correct ABI), then the user should get an error and the UI should not generate any additional interfaces
* Each contract should be presented in it's own interface, with a distinct set of details related to that one contract
* Every user should be able to see the following details of the contract interface:
	* The address of the contract
	* The network the contract is running on
	* The owner of the contract
	* The Address and ID of the NFT being sold
	* The ERC20 token that is being used to bid on the contract
	* Contract State: A field that shows whether the contract has been started, is in progress, bidding has been completed (but not finalized) and if the contract has been finalized. The states are "Not Started", "In Progress", "Bidding Complete", "Finalized"
	* The current max bidder of the contract
	* The amount of ERC20 tokens that has been bid on this contract in ETH
		* This means that you should not present the token data in Wei (100,000,000,000,000,000), but in ETH (0.1) when presenting to user
	* A prompt allowing the user to place a bid on the NFT
	* A prompt allowing the user to make an approval for the ERC20 token to the contract to allow for bidding
* After the bidding has ended, do not allow the user to make another bid
	* This should be done by disabling the 'Bid' button and prevent a transaction from being made in the UI
* The owner of the contract should be able to see additional details in their interface:
	* They should be given a button that allows them to finalize the auction
* Errors should present in the interface in a human readable format for the following errors:
	* If the user has not given enough approval for the ERC20 token they are wishing to bid
	* If the user does not have enough of the tokens they are wish to bid
	* If the NFT is no longer owned by the owner upon finalization
	* If the NFT is no longer approved by the owner upon finalization
	* If the contract no longer has ERC20 approval from the winning bidder
	* If the winning bidder no longer has the number of ERC20 tokens required to make the contract work

## Part 2: Additional Project Requirements
To test this interface, you must deploy this to your local system, using a local hardhat node to test your interface. In order to do this, please make the following changes to your code:

Set your local hardhat network to automine nodes. This will allow you to realistically test your setup without having to deploy to a test network.
Update your contract to have the following properties:
Auction time should last 1 hour
Create a deployment script to deploys the NFT, ERC20 token and Auction contract you wish to use as well as giving ERC20 tokens to three users who can be used to bid on the contract.
Setup a Hardhat Node instance and deploy the script to this instance
Deploy your UI to your local environment, and setup your environment so that you can interact with your local blockchain
Setup your metamask wallet to import the 4 user addresses (the owner, plus the three users), so that you can test your UI by impersonating these different accounts.
Have the users then use the interface by adding the auction contract and then bidding on the contract.
Finalize the auction and confirm that the behavior is as expected

## Part 3: UI Testing
Please test for the following scenarios in your UI:

Add a contract that does conform to the Auction contract ABI and have a new element appear
Add a contract that does not conform to the Auction contract ABI and gives and error
Have users approve tokens with your UI
Have users bid on the contract
Have the owner attempt to finalize the contract before the end of bidding
Have a user bid without approval
Have a user bid without having enough tokens
Have the winner remove approval for the NFT and attempt to finalize the contract
Have the user send all of their tokens to another address and have the owner attempt to finalize the contract
Finalize the bidding of the contract once bidding has ended (note, you can accelerate the time of the node using evm_increaseTime through the console)

## Part 4: Handling Events in th eUI
In our contract, we do not handle past user bidding details. However, the contract does emit events every time someone gives a bid. We can setup our UI in such a way that we can collect these events as they happen and show them to the user.

In the UI, please make the following changes as a new component of the interface with the following properties:

When the auction is started, have a new line item appear that shows the details of the auction
Every time a user makes a bid, that bid information should be shown as a line item in the component, showing the address and how much they bid
When the bid is finalized, that information should be presented in details.
Please update your UI to also include this information. Add these details to your existing UI (you do not need to make a new UI).

While the best practice would be to handle this in a database, you can store these values locally in the browser. So don't feel the need to create a separate backend service to handle this.

## Update Your Readme
Once you have setup your project, please update your Readme to include a list of instructions on how to get both the project and UI running on another system. This should include:

Getting the node setup
Deploying the contract and setting up the accounts
Getting the UI deployed
This will allow us to get the UI setup for testing your evaluation answers.