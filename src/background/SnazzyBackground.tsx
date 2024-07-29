import leftBackground from "./left.png";
import rightBackground from "./right.png";

// Component which loads the background images onto the app
export default function SnazzyBackground() {
	return (
		<div className="absolute w-screen h-screen overflow-hidden">
			<img
				src={leftBackground}
				className="fixed left-[-200px] bottom-[-200px] w-[800px] h-[800px] select-none"
				aria-label="Left background image"
			/>
			<img
				src={rightBackground}
				className="fixed right-[-200px] top-[-200px] w-[800px] h-[800px] select-none"
				aria-label="Right background image"
			/>
		</div>
	);
}
