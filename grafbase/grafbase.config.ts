import { config, g, auth } from "@grafbase/sdk";
// @ts-ignore
const User = g
	.model("User", {
		name: g.string().length({ min: 4, max: 25 }),
		email: g.string().unique(),
		avatar: g.url(),
		description: g.string().optional(),
		github: g.url().optional(),
		linkedIn: g.url().optional(),
		projects: g
			.relation(() => Project)
			.list()
			.optional(),
	})
	.auth((rules) => {
		rules.public().read();
	});

// @ts-ignore
const Project = g
	.model("Project", {
		title: g.string().length({ min: 5 }),
		description: g.string(),
		image: g.url(),
		liveSite: g.url(),
		github: g.url(),
		category: g.string().search(),
		createdBy: g.relation(() => User),
	})
	.auth((rules) => {
		rules.public().read();
		rules.private().create().delete().update();
	});

const jwt = auth.JWT({
	issuer: "grafbase",
	secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
	schema: g,
	auth: {
		providers: [jwt],
		rules: (rules) => rules.private(),
	},
});
