import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUserProjects } from "~/lib/actions";
import { UserProfile } from "~/types";

interface Props {
	authorId: string;
	projectId: string;
}

async function RelatedProjects({ authorId, projectId }: Props) {
	const { user } = (await getUserProjects(authorId, 4)) as {
		user?: UserProfile;
	};

	const filteredProjects = user?.projects.edges.filter(
		({ node }) => node.id !== projectId
	);

	if (filteredProjects?.length === 0) {
		return null;
	}

	return (
		<section className="flex flex-col mt-20 w-full">
			<div className="flexBetween">
				<p className="text-base font-bold">More by {user?.name}</p>
				<Link
					href={`/profile/${user?.id}`}
					className="text-primary-purple text-base"
				>
					View All
				</Link>
			</div>
			<div className="related_projects-grid">
				{filteredProjects?.map(({ node }) => (
					<div
						key={node.id}
						className="flexCenter related_project-card drop-shadow-card"
					>
						<Link
							href={`/project/${node.id}`}
							className="flexCenter group relative w-full h-full"
						>
							<Image
								src={node.image}
								alt={node.title}
								width={414}
								height={314}
								className="object-cover rounded-xl"
							/>
							<div className="hidden group-hover:flex related_project-card_title">
								<p className="w-full text-[15px] font-semibold text-slate-100">
									{node.title}
								</p>
							</div>
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}

export default RelatedProjects;
