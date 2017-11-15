export async function updateBalance(contract, wallet) {
    const { balance } = await contract.functions.balanceOf(wallet.getAddress());
    return balance.toString();
}