"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { categoryFilters } from "~/constants";

function Categories() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const category = searchParams.get("category");

	const handleTags = (tag: string) => {
		router.push(`${pathname}?category=${tag}`);
	};

	return (
		<div className="flexBetween w-full gap-5 flex-wrap">
			<ul className="flex gap-2 overflow-auto">
				{categoryFilters.map((tag) => (
					<button
						key={tag}
						type="button"
						onClick={() => handleTags(tag)}
						className={`px-4 py-2 rounded-lg capitalize whitespace-nowrap hover:bg-light-white-300 ${
							category === tag
								? "bg-light-white-300 font-semibold"
								: "font-medium"
						}`}
					>
						{tag}
					</button>
				))}
			</ul>
		</div>
	);
}

export default Categories;
