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

export const categoryprojectsQuery = `
  query getProjects($category: String, $endCursor: String) {
    projectSearch(first: 8, after: $endCursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          github
          description
          liveSite
          id
          image
          category
          createdBy {
            id
            email
            name
            avatar
          }
        }
      }
    }
  }
`;

export const projectsQuery = `
  query getProjects($endCursor: String) {
    projectSearch(first: 8, after: $endCursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          github
          description
          liveSite
          id
          image
          category
          createdBy {
            id
            email
            name
            avatar
          }
        }
      }
    }
  }
`;

export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSite
      github
      category
      createdBy {
        id
        name
        email
        avatar
      }
    }
  }
`;

export const getProjectsByAuthor = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatar
      github
      linkedIn
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const editProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
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
