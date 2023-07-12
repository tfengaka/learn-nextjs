"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "./Button";

interface Props {
	startCursor: string;
	endCursor: string;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

function LoadMore({
	startCursor,
	endCursor,
	hasPreviousPage,
	hasNextPage,
}: Props) {
	const router = useRouter();

	const handleNavigation = (direction: string) => {
		const currentParams = new URLSearchParams(window.location.search);

		if (direction === "next" && hasNextPage) {
			currentParams.delete("startcursor");
			currentParams.set("endcursor", endCursor);
		} else if (direction === "first" && hasPreviousPage) {
			currentParams.delete("endcursor");
			currentParams.set("startcursor", startCursor);
		}

		const newSearchParams = currentParams.toString();
		const newPathName = `${window.location.pathname}?${newSearchParams}`;
		router.push(newPathName);
	};

	return (
		<div className="w-full flexCenter gap-10 mt-10">
			{hasPreviousPage && (
				<Button title="First Page" onClick={() => handleNavigation("first")} />
			)}
			{hasNextPage && (
				<Button title="Next Page" onClick={() => handleNavigation("next")} />
			)}
		</div>
	);
}

export default LoadMore;
