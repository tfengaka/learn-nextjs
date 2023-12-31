import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "~/constants";
import { getCurrentUser } from "~/lib/session";
import AuthProviders from "./AuthProviders";
import ProfileMenu from "./ProfileMenu";

async function Navbar() {
	const session = await getCurrentUser();
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
			<div className="flexCenter gap-4">
				{session?.user ? (
					<>
						<ProfileMenu session={session} />
						<Link
							href={"/project/create"}
							className="px-4 py-3 rounded-md text-sm font-semibold hover:bg-purple-800 transition-colors bg-primary-purple text-white"
						>
							Share Work
						</Link>
					</>
				) : (
					<AuthProviders />
				)}
			</div>
		</nav>
	);
}

export default Navbar;
