import { GraphQLClient } from "graphql-request";
import {
	createProjectMutation,
	createUserMutation,
	deleteProjectMutation,
	editProjectMutation,
	getProjectByIdQuery,
	getProjectsByAuthor,
	getUserQuery,
	projectsQuery,
} from "~/graphql";
import { ProjectForm } from "~/types";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
	: "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
	: "adminadmin";

const serverUrl = isProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
	try {
		return await client.request(query, variables);
	} catch (error) {
		throw error;
	}
};

export const getUser = (email: string) => {
	client.setHeader("x-api-key", apiKey);
	return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatar: string) => {
	client.setHeader("x-api-key", apiKey);
	const variables = {
		input: {
			name: name,
			email: email,
			avatar: avatar,
		},
	};
	return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
	try {
		const response = await fetch(`${serverUrl}/api/auth/token`);
		return response.json();
	} catch (error) {
		throw error;
	}
};

export const uploadImage = async (path: string) => {
	try {
		const response = await fetch(`${serverUrl}/api/upload`, {
			method: "POST",
			body: JSON.stringify({ path }),
		});
		return response.json();
	} catch (error) {
		throw error;
	}
};

export const createNewProject = async (
	form: ProjectForm,
	creatorId: string,
	token: string
) => {
	const imageUrl = await uploadImage(form.image);

	if (imageUrl.secure_url) {
		client.setHeader("Authorization", `Bearer ${token}`);
		const variables = {
			input: {
				...form,
				image: imageUrl.secure_url,
				createdBy: {
					link: creatorId,
				},
			},
		};
		return makeGraphQLRequest(createProjectMutation, variables);
	}
};

export const fetchAllProjects = async (
	category?: string,
	endCursor?: string
) => {
	client.setHeader("x-api-key", apiKey);
	return makeGraphQLRequest(projectsQuery, { category, endCursor });
};

export const getProjectDetails = (id: string) => {
	client.setHeader("x-api-key", apiKey);
	return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
	client.setHeader("x-api-key", apiKey);
	return makeGraphQLRequest(getProjectsByAuthor, { id, last });
};

export const deleteProject = (id: string, token: string) => {
	client.setHeader("Authorization", `Bearer ${token}`);
	return makeGraphQLRequest(deleteProjectMutation, { id });
};
export const editProject = async (
	id: string,
	token: string,
	form: ProjectForm
) => {
	function isBase64Url(value: string) {
		const base64Regex = /^data:image\/[a-z]+;base64,/;
		return base64Regex.test(value);
	}
	let updatedForm = { ...form };
	const isUploadingNewImage = isBase64Url(form.image);
	if (isUploadingNewImage) {
		const imageUrl = await uploadImage(form.image);
		if (imageUrl.secure_url) {
			updatedForm = {
				...form,
				image: imageUrl.secure_url,
			};
		}
	}
	const variables = {
		id,
		input: updatedForm,
	};
	client.setHeader("Authorization", `Bearer ${token}`);
	return makeGraphQLRequest(editProjectMutation, variables);
};
