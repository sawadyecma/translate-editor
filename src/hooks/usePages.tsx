import { useState } from "react";
import { server } from "../config";
import { getPages } from "../rpc/page";
import { Page } from "../type";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const usePages = (props: { initialPages: Page[] }) => {
  const [pages, setPages] = useState(props.initialPages);
  const [editting, setEditting] = useState<PartialBy<Page, "id">>({
    name: "",
  });
  const [newPage, setNewPage] = useState<Pick<Page, "name">>({ name: "" });

  const onUpdate = async () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ name: editting.name });

    await fetch(`${server}/api/pages/${editting.id}`, {
      method: "PUT",
      body,
      headers,
    });

    setEditting({ name: "" });

    setPages(await getPages());
  };

  const onCreate = async () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({ name: newPage.name });

    await fetch(`${server}/api/pages/`, {
      method: "POST",
      body,
      headers,
    });

    setNewPage({ name: "" });

    setPages(await getPages());
  };

  const onDelete = async (id: number) => {
    const headers = {
      Accept: "application/json",
    };

    await fetch(`${server}/api/pages/${id}`, {
      method: "DELETE",
      headers,
    });

    setPages(await getPages());
  };

  const onPageSelect = (page: Page) => {
    if (editting.id === page.id) {
      return;
    }
    setEditting({ id: page.id, name: page.name });
  };

  const onPageChange = (name: string) => {
    setEditting({ ...editting, name });
  };

  const onNewPageChange = (name: string) => {
    setNewPage({ name });
  };

  return {
    state: {
      pages,
      newPage,
      editting,
    },
    handlers: {
      onUpdate,
      onCreate,
      onDelete,
      onPageSelect,
      onPageChange,
      onNewPageChange,
    },
  };
};
