import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "~/constants";
import AuthProviders from "./AuthProviders";

function Navbar() {
	const session = {};
	return (
		<nav className="flexBetween navbar">
			<div className="flex-1 flexStart gap-10">
				<Link href="/">
					<Image src="/logo.svg" alt="flexxible" width={115} height={43} />
				</Link>
				<ul className="xl:flex hidden text-small gap-7">
					{NavLinks.map((link) => (
						<Link key={link.key} href={link.href}>
							{link.text}
						</Link>
					))}
				</ul>
			</div>
			<div className="flexCenter gap-4 ">
				{session ? (
					<>
						User Protos
						<Link href={"/create-project"}>Share Work</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	);
}

export default Navbar;
