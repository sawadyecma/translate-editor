import type { NextApiRequest, NextApiResponse } from "next";
import { Page } from "../../type";
import { composeNewId } from "../_utils/id";

export let storage = {
  pages: [...new Array(10)].map((_, i) => ({
    id: i + 1,
    name: `ページ${i + 1}`,
  })),
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ pages: Page[] } | { page: Page }>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.send({
        pages: storage.pages,
      });
      break;
    case "POST":
      const {
        body: { name },
      } = req;

      const newPage = { id: composeNewId(storage.pages), name };
      storage.pages.push(newPage);

      res.send({
        page: newPage,
      });
  }
}
