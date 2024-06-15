import leftBackground from "./background/left.png";
import rightBackground from "./background/right.png";

export default function SnazzyBackground() {
	return (
		<div style={{ position: "absolute", width: "100vw", height: "100vh", overflow: "hidden" }}>
			<img src={leftBackground} className="absolute" style={{ left: -200, bottom: -200, width: 800, height: 800 }} />
			<img src={rightBackground} className="absolute" style={{ right: -200, top: -200, width: 800, height: 800 }} />
		</div>
	);
}
