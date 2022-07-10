const clientDefs = `
type Client {
    id: ID
    name: String
    lastname: String
    email: String
    address: String
    references: String
    phone: String
    created: String
    role: String  
  }
  input ClientInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
  }
  input AuthInput {
    email: String!
    password: String!
  }
  type Token {
    token: String
  }

  input ClientUpdateInput {
    name: String
    lastname: String
    address: String
    phone: String
    references: String
  }
`;

module.exports = clientDefs;
