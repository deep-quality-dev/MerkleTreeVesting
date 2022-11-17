# MerkleTreeVesting

## Overview

This contract contains two main functionalities:

- Token vesting that vests its balance of any ERC20 token to beneficiaries gradually in a linear fashion until \_start + \_duration. By then all of the balance will have vested.
- Verify the beneficiary through merkle tree.

Defined structs:

```solidity
struct TokenAward {
  uint26 amount;
  uint256 released;
  bool revocable;
  bool revoked;
}

```

| name            |              type              | description                                           | example | default |
| :-------------- | :----------------------------: | ----------------------------------------------------- | ------- | ------: |
| vestingStart    |            uint256             | Start block number of vesting schedule                |         |         |
| vestingCliff    |            uint256             | Cliff block number (>= vestingStart)                  |         |         |
| vestingDuration |            uint256             | Duration of vesting schedule in block number          |         |         |
| awards          | mapping(address => TokenAward) | Tracks the token awards for each user (user => award) |         |         |
| targetToken     |             IERC20             | Vesting token address                                 |         |         |

## How to use

1. Prepare vesting schedule in block number: start, cliff, duration and vesting token.
2. Prepare the whitelist and their vesting amount, generate the merkle tree and output to the JSON file. Check JSON file format in `test/resources/vesting/testMerkle.json`.
   It contains the merkle root, total token amount for vesting, individual token amounts and list of merkle proof.
3. Deploy `MerkleTreeVesting` with vesting schedule and merkle root.
4. Transfer assets to this contract.
5. Beneficiaries can check their releasable amount and vested amount by `getReleasableAmount`, `getVestedAmount` function.
6. Beneficiaries can claim their vested tokens after cliff by `claimAward` function.
7. Only verified users can claim.

## Functions

### WRITE

#### release

Transfers vested tokens to beneficiary.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | who the tokens are being released to |

#### revoke

Allows the owner to revoke the vesting. Tokens already vested are transfered to the beneficiary, the rest are returned to the owner.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | who the tokens are being released to |

#### getReleaseableAmount

Calculates the amount that has already vested but hasn't been released yet.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | who the tokens are being released to |

#### getVestedAmount

Calculates the amount that has already vested.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | who the tokens are being released to |

#### isClaimed

Used to check if a merkle claim has been claimed from the merkle tree.

| name  |  type   |        description |
| :---- | :-----: | -----------------: |
| index | uint256 | index of the award |

#### claimAward

Claim award to account who would be verified through merkle tree.

| name        |   type   |                        description |
| :---------- | :------: | ---------------------------------: |
| index       | uint256  |                 index of the award |
| account     | address  | who the token are being awarded to |
| revocable   |   bool   |                  true if revokable |
| merkleProof | byte32[] |    array of the proof for the leaf |

### READ

#### getReleasableAmount

Calculates the amount that has already vested but hasn't been released yet.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | Who the tokens are being released to |

#### getVestedAmount

Calculates the amount that has already vested.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | Who the tokens are being released to |

#### isClaimed

Used to check if a merkle claim has been claimed from the merkle tree.

| name  |  type   |            description |
| :---- | :-----: | ---------------------: |
| index | uint256 | The index of the award |
