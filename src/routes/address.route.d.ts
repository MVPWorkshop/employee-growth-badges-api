declare namespace AddressRouteNamespace {
  interface IAddressGetResponse {
    id: string;
    address: string;
    username?: string;
    email?: string;
    createdAt: string;
    updatedAt: string;
  }
}

export default AddressRouteNamespace;
