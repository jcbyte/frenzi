import leftBackground from "./background/left.png";
import rightBackground from "./background/right.png";

export default function SnazzyBackground() {
	return (
		<div className="absolute w-screen h-screen overflow-hidden">
			<img src={leftBackground} className="absolute left-[-200px] bottom-[-200px] w-[800px] h-[800px]" />
			<img src={rightBackground} className="absolute right-[-200px] top-[-200px] w-[800px] h-[800px]" />
		</div>
	);
}
