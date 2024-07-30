import { motion } from "framer-motion";
import { ReactNode } from "react";

const animation = {
	initial: { opacity: 0, x: 100 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -100 },
};

export default function AnimatedPage({ children }: { children: ReactNode }) {
	return (
		<motion.div variants={animation} initial="initial" animate="animate" exit="exit" transition={{ duration: 1 }}>
			{children}
		</motion.div>
	);
}
