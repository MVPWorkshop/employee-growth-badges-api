declare namespace TransfersServiceNamespace {
  interface ICreateTransferData {
    txHash: string;
    from: string;
    to: string;
    blockchainTokenId: string;
  }
}

export default TransfersServiceNamespace;
