import { config, g } from "@grafbase/sdk";

const User = g.model("User", {
	name: g.string().length({ min: 4, max: 25 }),
	email: g.string().unique(),
	avatar: g.url(),
	description: g.string(),
	github: g.url().optional(),
	linkedIn: g.url().optional(),
	projects: g
		.relation(() => Project)
		.list()
		.optional(),
});

const Project = g.model("Projects", {
	title: g.string().length({ min: 5 }),
	description: g.string(),
	image: g.url(),
	liveSite: g.url(),
	github: g.url(),
	category: g.string().search(),
	createdBy: g.relation(() => User),
});

export default config({
	schema: g,
});
