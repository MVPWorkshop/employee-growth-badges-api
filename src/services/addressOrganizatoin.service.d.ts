declare namespace AddressOrganizationServiceNamespace {
  interface ICreateRelationshipData {
    organizationId: string;
    addressId: string;
    revoked?: boolean;
  }
}

export default AddressOrganizationServiceNamespace;
