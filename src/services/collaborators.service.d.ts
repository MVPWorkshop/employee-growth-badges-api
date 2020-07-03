declare namespace CollaboratorServiceNamespace {
  interface ICreateCollaboratorData {
    organizationId: string;
    addressId: string;
    revoked?: boolean;
  }
}

export default CollaboratorServiceNamespace;
