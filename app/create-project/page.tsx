import { redirect } from "next/navigation";
import Modal from "~/components/Modal";
import ProjectForm from "~/components/ProjectForm";
import { getCurrentUser } from "~/lib/session";

async function CreateProject() {
	const session = await getCurrentUser();
	if (!session) redirect("/");
	return (
		<Modal>
			<h3 className="modal-head-text">Create New Project</h3>
			<ProjectForm type="create" session={session} />
		</Modal>
	);
}

export default CreateProject;
