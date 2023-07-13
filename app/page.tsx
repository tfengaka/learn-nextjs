import Categories from "~/components/Categories";
import LoadMore from "~/components/LoadMore";
import ProjectCard from "~/components/ProjectCard";
import { fetchAllProjects } from "~/lib/actions";
import { ProjectInterface } from "~/types";

interface ProjectSearch {
	projectSearch: {
		edges: {
			node: ProjectInterface;
		}[];
		pageInfo: {
			hasNextPage: boolean;
			hasPreviousPage: boolean;
			startCursor: string;
			endCursor: string;
		};
	};
}

interface Props {
	searchParams: {
		category?: string;
		endcursor?: string;
	};
}

async function HomePage({ searchParams: { category, endcursor } }: Props) {
	const { projectSearch } = (await fetchAllProjects(
		category,
		endcursor
	)) as ProjectSearch;
	const displayProjects = projectSearch.edges || [];
	const pagination = projectSearch.pageInfo;
	if (displayProjects.length === 0) {
		return (
			<section className="flex flex-col paddings">
				<Categories />
				<p className="no-result-text text-center">
					No Projects Found, Go Create some first.
				</p>
			</section>
		);
	}

	return (
		<section className="flex flex-col paddings mb-16">
			<Categories />
			<section className="projects-grid">
				{displayProjects.map(({ node }) => (
					<ProjectCard
						key={node.id}
						id={node.id}
						image={node.image}
						title={node.title}
						authorId={node.createdBy.id}
						authorName={node.createdBy.name}
						authorAvatar={node.createdBy.avatar}
					/>
				))}
			</section>
			<LoadMore
				startCursor={pagination.startCursor}
				endCursor={pagination.endCursor}
				hasNextPage={pagination.hasNextPage}
				hasPreviousPage={pagination.hasPreviousPage}
			/>
		</section>
	);
}

export default HomePage;
