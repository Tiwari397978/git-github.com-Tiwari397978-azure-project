# Group Message Data Encryption

## Context:
- Given the implementation of messaging application that send messages back and forth from the database.
## Problem:
- The problem with messages stored in plain-text appears when there's a data leak and other eyes (with no authority) can now read the messages.
## Solution:
- [Crypto-js](https://www.npmjs.com/package/crypto-js) is a npm library that is chosen to solve this problem. 

