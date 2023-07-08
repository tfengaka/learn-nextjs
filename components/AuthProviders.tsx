"use client";
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

interface Provider {
	id: string;
	name: string;
	type: string;
	signinUrl: string;
	callbackUrl: string;
	signinUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider> | null;

function AuthProviders() {
	const [providers, setProviders] = useState<Providers | null>(null);

	useEffect(() => {
		(async function () {
			const res = await getProviders();
			setProviders(res);
		})();
	}, []);

	if (providers) {
		return (
			<div>
				{Object.values(providers).map((provider: Provider, index) => (
					<button key={index} onClick={() => signIn(provider?.id)}>
						{provider.id}
					</button>
				))}
			</div>
		);
	}
}

export default AuthProviders;
