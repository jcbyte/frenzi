import { motion } from "framer-motion";
import { ReactNode } from "react";

const animation = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
};

export default function GenericPage({ children }: { children: ReactNode }) {
	return (
		<motion.div
			className="p-4 flex flex-col gap-2 absolute"
			variants={animation}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.2 }}
		>
			{children}
		</motion.div>
	);
}
