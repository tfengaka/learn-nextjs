"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
	id: string;
	image: string;
	title: string;
	authorName: string;
	authorAvatar: string;
	authorId: string;
}

function ProjectCard({
	id,
	title,
	image,
	authorId,
	authorName,
	authorAvatar,
}: Props) {
	const [views, setViews] = useState("");
	const [likes, setLikes] = useState(0);

	useEffect(() => {
		setLikes(Math.floor(Math.random() * 10000));
		setViews(
			String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
		);
	}, []);

	return (
		<div className="flexCenter flex-col rounded-xl drop-shadow-card">
			<Link
				href={`/project/${id}`}
				className="flexCenter group relative w-full h-full"
			>
				<Image
					src={image}
					alt={title}
					width={414}
					height={314}
					className="w-full h-full object-cover rounded-xl"
				/>
				<div className="hidden group-hover:flex profile_card-title">
					<p className="w-full text-[15px] font-semibold text-slate-100">
						{title}
					</p>
				</div>
			</Link>
			<div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
				<Link href={`/profile/${authorId}`}>
					<div className="flexCenter gap-2">
						<Image
							src={authorAvatar}
							alt={authorName}
							width={24}
							height={24}
							className="rounded-full object-cover"
						/>
						<p>{authorName}</p>
					</div>
				</Link>
				<div className="flexCenter gap-3">
					<div className="flexCenter gap-2">
						<Image src="/hearth.svg" alt="heart" width={13} height={12} />
						<p className="text-sm">{likes}</p>
					</div>
					<div className="flexCenter gap-2">
						<Image src="/eye.svg" alt="eye" width={13} height={12} />
						<p className="text-sm">{views}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectCard;
