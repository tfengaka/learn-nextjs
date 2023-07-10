export const getUserQuery = `
query GetUser($email: String!) {
  user(by: { email: $email }) {
    id
    name
    email
    avatar
    description
    github
    linkedIn
  }
}
`;

export const createUserMutation = `
mutation CreateUser($input: UserCreateInput!) {
  userCreate(input: $input) {
    user {
      id
      name
      email
      avatar
      description
      github
      linkedIn
    }
  }
}
`;

export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;
