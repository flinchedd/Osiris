from solana.rpc.api import Client
from solana.transaction import Transaction
from solana.publickey import PublicKey
from solana.keypair import Keypair

class SolanaSDK:
    def __init__(self, endpoint="https://api.mainnet-beta.solana.com"):
        self.client = Client(endpoint)

    def get_account_balance(self, public_key):
        try:
            balance = self.client.get_balance(PublicKey(public_key))
            return balance["result"]["value"]
        except Exception as e:
            print(f"Error fetching balance for {public_key}: {e}")
            return None

    def send_transaction(self, from_keypair, to_address, amount):
        try:
            transaction = Transaction()
            transaction.add({
                # Add a transfer instruction here
                "from": from_keypair.public_key,
                "to": PublicKey(to_address),
                "lamports": amount
            })
            response = self.client.send_transaction(transaction, from_keypair)
            return response["result"]
        except Exception as e:
            print(f"Error sending transaction: {e}")
            raise
