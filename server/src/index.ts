import cors from "cors";
import express, { Express, Request, Response } from "express";
import { ApiMessage } from "./shared/types";

const PORT: number = 3001;
const app: Express = express();

app.use(express.json());
app.use(cors());

app.get("/api", (req: Request, res: Response) => {
	res.json({ message: "Hello React!" } as ApiMessage);
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
