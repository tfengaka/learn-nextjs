"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {
	MouseEventHandler,
	ReactNode,
	useCallback,
	useRef,
} from "react";

interface Props {
	children: ReactNode;
}

function Modal({ children }: Props) {
	const router = useRouter();
	const overlay = useRef<HTMLDivElement>(null);
	const wrapper = useRef<HTMLDivElement>(null);

	const onDismiss = useCallback(() => {
		router.push("/");
	}, [router]);

	const handleClick = useCallback(
		(event: React.MouseEvent) => {
			if (event.target === overlay.current && onDismiss) {
				onDismiss();
			}
		},
		[onDismiss, overlay]
	);
	return (
		<div ref={overlay} className="modal" onClick={handleClick}>
			<button
				type="button"
				onClick={onDismiss}
				className="absolute top-4 right-8"
			>
				<Image src="/close.svg" width={17} height={17} alt="close" />
			</button>
			<div ref={wrapper} className="modal_wrapper ">
				{children}
			</div>
		</div>
	);
}

export default Modal;
