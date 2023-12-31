import { User, Session } from "next-auth";

export type FormState = {
	title: string;
	description: string;
	image: string;
	liveSite: string;
	github: string;
	category: string;
};

export interface ProjectInterface {
	title: string;
	description: string;
	image: string;
	liveSite: string;
	github: string;
	category: string;
	id: string;
	createdBy: {
		name: string;
		email: string;
		avatar: string;
		id: string;
	};
}

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	description: string | null;
	avatar: string;
	github: string | null;
	linkedIn: string | null;
	projects: {
		edges: { node: ProjectInterface }[];
		pageInfo: {
			hasPreviousPage: boolean;
			hasNextPage: boolean;
			startCursor: string;
			endCursor: string;
		};
	};
}

export interface SessionInterface extends Session {
	user: User & {
		id: string;
		name: string;
		email: string;
		avatar: string;
	};
}

export interface ProjectForm {
	title: string;
	description: string;
	image: string;
	liveSite: string;
	github: string;
	category: string;
}
