import React, { useEffect } from "react";

import Admin from "layouts/Admin.js";
import { parseCookies, parseJwt } from "utils/parseCookie";
import { useRouter } from "next/router";
import { Page } from "components/Helmet/Helmet";
import withAuth from "lib/Hoc/withAuth";
import useAllowedRoles from "lib/hooks/useRoles";

function AddMDA() {
	return (
		<Page title={"Set Up"}>
			<div className="flex flex-wrap">
				<h1>Add MDA</h1>
			</div>
		</Page>
	);
}

function AdminAddMDA({ token }) {
	useAllowedRoles(token);
	return (
		<Admin>
			<AddMDA />
		</Admin>
	);
}

export async function getServerSideProps({ req }) {
	const data = parseCookies(req);

	return { props: { token: data.user || null } };
}

export default withAuth(AdminAddMDA);
