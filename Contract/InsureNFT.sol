// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract InsuranceNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public owner;

    struct Policy {
        string name;
        string coverage;
        uint256 premium;
        uint256 payout;
        string eligibility;
    }

    struct User {
        string name;
        uint256 age;
        uint256 income;
        uint256 policyId; // ID of the purchased policy
        uint256 nftTokenId; // Token ID of their NFT
    }

    mapping(address => User) private users;
    mapping(uint256 => Policy) public policies;
    mapping(uint256 => address) private tokenOwners; // Track token owners

    event PolicyPurchased(
        address indexed userAddress,
        string userName,
        uint256 policyId,
        uint256 tokenId,
        uint256 premiumPaid,
        string successMessage
    );

    constructor() ERC721("InsuranceNFT", "INFT") {
        owner = msg.sender;

        // Initialize some policies
        policies[1] = Policy(
            "Basic Renter's Insurance",
            "Personal property, liability, additional living expenses",
            20 ether,
            50000,
            "Income <= 50000, Age >= 18"
        );
        policies[2] = Policy(
            "Premium Renter's Insurance",
            "Personal property, liability, natural disasters",
            40 ether,
            100000,
            "Income <= 80000, Age >= 21"
        );
        policies[3] = Policy(
            "Standard Homeowner's Insurance",
            "Property damage, liability, theft",
            60 ether,
            150000,
            "Income <= 100000, Age >= 25"
        );
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action.");
        _;
    }

    // Store user details with wallet address
    function storeUserInfo(
        address walletAddress,
        string memory name,
        uint256 age,
        uint256 income
    ) public {
        require(walletAddress != address(0), "Invalid wallet address.");
        require(bytes(name).length > 0, "Name is required.");
        require(age >= 18, "User must be at least 18 years old.");
        require(income > 0, "Income must be greater than zero.");

        users[walletAddress] = User(name, age, income, 0, 0);
    }

    // Retrieve user details by wallet address
    function getUserInfoByWallet(address walletAddress) public view returns (User memory) {
        require(walletAddress != address(0), "Invalid wallet address.");
        User memory user = users[walletAddress];
        require(bytes(user.name).length > 0, "User not found.");
        return user;
    }

    // Collect user details and purchase a policy
    function purchasePolicy(
        string memory name,
        uint256 age,
        uint256 income,
        uint256 policyId
    ) public payable returns (uint256, uint256, string memory) {
        require(bytes(name).length > 0, "Name is required.");
        require(age >= 18, "User must be at least 18 years old.");
        require(income > 0, "Income must be greater than zero.");

        Policy memory policy = policies[policyId];
        require(bytes(policy.name).length > 0, "Policy does not exist.");
        require(msg.value >= policy.premium, "Insufficient payment.");

        // Register or update user details
        User storage user = users[msg.sender];
        user.name = name;
        user.age = age;
        user.income = income;

        // Mint NFT
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);

        // Track token ownership
        tokenOwners[newTokenId] = msg.sender;

        // Set metadata for the NFT
        string memory metadataURI = string(
            abi.encodePacked(
                '{"name":"', policy.name, '",',
                '"description":"Insurance NFT for ', policy.name, '",',
                '"attributes":[{"trait_type":"Coverage","value":"', policy.coverage, '"},',
                '{"trait_type":"Premium","value":"', uint2str(policy.premium), '"},',
                '{"trait_type":"Payout","value":"', uint2str(policy.payout), '"}]}'
            )
        );

        _setTokenURI(newTokenId, metadataURI);

        // Update user details
        user.policyId = policyId;
        user.nftTokenId = newTokenId;

        // Emit a detailed event
        emit PolicyPurchased(
            msg.sender,
            name,
            policyId,
            newTokenId,
            msg.value,
            "Policy successfully purchased!"
        );

        return (policyId, newTokenId, "Policy successfully purchased!");
    }

    // Check if user owns a valid policy NFT
    function validatePolicy(address user) public view returns (bool) {
        User memory userInfo = users[user];
        return userInfo.nftTokenId != 0 && tokenExists(userInfo.nftTokenId);
    }

    // Manual implementation of token existence check
    function tokenExists(uint256 tokenId) public view returns (bool) {
        return tokenOwners[tokenId] != address(0);
    }

    // Utility function to convert uint to string
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) return "0";
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    // Withdraw funds from the contract
    function withdrawFunds() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
