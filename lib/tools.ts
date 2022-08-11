import fs from "fs";
import path from "path";

export const allTools = () =>
  fs
    .readdirSync(path.join(process.cwd(), "tools"))
    .filter((file) => path.extname(file) === ".json");

export function getTool(filename: string) {
  const fileData = fs.readFileSync(path.join(process.cwd(), "tools", filename));
  return {
    id: filename.replace(".json", ""),
    ...JSON.parse(fileData.toString()),
  };
}

type ToolProps = {
  perPage?: number;
  page?: number;
};

export function getTools({ perPage = 12, page = 1 }: ToolProps) {
  const count = getCount();
  const requestedCount = perPage * page;
  if (requestedCount > count) {
    throw new Error("No more tools available");
  }
  const requestedCountStart = perPage * (page - 1);
  const requestedTools = allTools().slice(
    requestedCountStart,
    requestedCountStart + perPage
  );

  return requestedTools.map(getTool);
}

export function getFeaturedTools() {
  const featuredTools = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "config/featured.json")).toString()
  );

  return featuredTools.map((file) => getTool(`${file}.json`));
}

export function getCount() {
  return allTools().length;
}
