"use client";

import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

import { SessionInterface } from "~/types";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div className="flexCenter z-10 flex-col relative">
			<Menu as="div">
				<Menu.Button
					className="flexCenter"
					onMouseEnter={() => setOpenModal(true)}
				>
					{session?.user?.image && (
						<Image
							src={session.user.image}
							width={40}
							height={40}
							className="rounded-full"
							alt="user profile image"
						/>
					)}
				</Menu.Button>

				<Transition
					show={openModal}
					as={Fragment}
					enter="transition ease-out duration-200"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items
						static
						className="flexStart profile_menu-items"
						onMouseLeave={() => setOpenModal(false)}
					>
						<div className="flex flex-col items-center gap-y-4 mb-2">
							{session?.user?.image && (
								<Image
									src={session?.user?.image}
									className="rounded-full"
									width={80}
									height={80}
									alt="profile Image"
								/>
							)}
							<p className="font-semibold">{session?.user?.name}</p>
						</div>

						<div className="flex flex-col gap-1 py-4 items-start w-full border-t border-nav-border">
							<Menu.Item>
								<Link
									href={`/profile/${session?.user?.id}`}
									className="text-sm font-semibold hover:bg-slate-200 rounded-md w-full px-4 py-2 transition-colors"
								>
									Work Preferences
								</Link>
							</Menu.Item>
							<Menu.Item>
								<Link
									href={`/profile/${session?.user?.id}`}
									className="text-sm font-semibold hover:bg-slate-200 rounded-md w-full px-4 py-2 transition-colors"
								>
									Profile
								</Link>
							</Menu.Item>
						</div>
						<div className="w-full flexStart border-t border-nav-border pt-5">
							<Menu.Item>
								<button
									type="button"
									className="text-sm font-semibold bg-primary-purple hover:bg-purple-800 text-white rounded-md w-full p-2 transition-colors"
									onClick={() => signOut()}
								>
									Sign out
								</button>
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

export default ProfileMenu;
