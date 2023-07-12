import React from "react";
import ProfilePage from "~/components/ProfilePage";
import { getUserProjects } from "~/lib/actions";
import { UserProfile } from "~/types";

interface Props {
	params: {
		id: string;
	};
}

async function UserProfile({ params: { id } }: Props) {
	const { user } = (await getUserProjects(id, 100)) as { user: UserProfile };

	if (!user) {
		return <p className="no-result-text">Fail to fetch user data</p>;
	}

	return <ProfilePage user={user} />;
}

export default UserProfile;
