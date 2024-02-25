import { writeFileSync } from "fs";
import packageJson from "../package.json" assert { type: "json" };

const [major, minor] = packageJson.version.split(".").map((s) => parseInt(s));

const newVersion = [major, minor + 1, 0].join(".");

packageJson.version = newVersion;

writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));
