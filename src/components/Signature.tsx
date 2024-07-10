import { VERSION } from "../static";

export default function Signature() {
	return (
		<div className="text-zinc-500 absolute right-2 bottom-2 text-right text-sm">
			<p>Frenzi {VERSION}</p>
			<p>By Joel Cutler</p>
		</div>
	);
}
