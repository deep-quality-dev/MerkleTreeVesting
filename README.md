# MerkleTreeVesting

This contract contains two main functionalities:

- Token vesting that vests its balance of any ERC20 token to beneficiaries gradually in a linear fashion until \_start + \_duration. By then all of the balance will have vested.
- Verify the beneficiary through merkle tree.

## Functions

### release

Transfers vested tokens to beneficiary.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | who the tokens are being released to |

### revoke

Allows the owner to revoke the vesting. Tokens already vested are transfered to the beneficiary, the rest are returned to the owner.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | who the tokens are being released to |

### getReleaseableAmount

Calculates the amount that has already vested but hasn't been released yet.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | who the tokens are being released to |

### getVestedAmount

Calculates the amount that has already vested.

| name        |  type   |                          description |
| :---------- | :-----: | -----------------------------------: |
| beneficiary | address | who the tokens are being released to |

### isClaimed

Used to check if a merkle claim has been claimed from the merkle tree.

| name  |  type   |        description |
| :---- | :-----: | -----------------: |
| index | uint256 | index of the award |

### claimAward

Claim award to account who would be verified through merkle tree.

| name        |   type   |                        description |
| :---------- | :------: | ---------------------------------: |
| index       | uint256  |                 index of the award |
| account     | address  | who the token are being awarded to |
| revocable   |   bool   |                  true if revokable |
| merkleProof | byte32[] |    array of the proof for the leaf |
