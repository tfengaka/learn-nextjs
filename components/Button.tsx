import Image from "next/image";
import { MouseEventHandler } from "react";

interface Props {
	type?: "button" | "submit" | "reset";
	title: string;
	leftIcon?: string | null;
	rightIcon?: string | null;
	isLoading?: boolean;
	bgColor?: string;
	textColor?: string;
	onClick?: MouseEventHandler;
}

function Button({
	type,
	title,
	leftIcon,
	rightIcon,
	isLoading,
	bgColor,
	textColor,
	onClick,
}: Props) {
	return (
		<button
			type={type || "button"}
			disabled={isLoading}
			className={`flexCenter gap-3 px-4 py-3 rounded-md text-sm font-semibold max-md:w-full hover:bg-purple-800 transition-colors
      ${textColor ? textColor : "text-white"}
      ${isLoading ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"}`}
			onClick={onClick}
		>
			{leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
			{title}
			{rightIcon && (
				<Image src={rightIcon} width={14} height={14} alt="right" />
			)}
		</button>
	);
}

export default Button;
