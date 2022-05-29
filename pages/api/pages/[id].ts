import type { NextApiRequest, NextApiResponse } from "next";
import { Page } from "../../type";
import { storage } from "../pages";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ page: Page }>
) {
  const {
    query: { id: rowId },
    body: { name },
    method,
  } = req;

  const id = Number(rowId);
  const pages = storage.pages;
  const index = pages.findIndex((page) => page.id === id);
  if (index === -1) {
    res.status(404);
    return;
  }

  switch (method) {
    case "GET":
      break;
    case "PUT":
      pages[index] = { id, name };
      res.status(200).json({ page: pages[index] });
      break;
    case "DELETE":
      pages.splice(index, 1);
      res.status(204).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
