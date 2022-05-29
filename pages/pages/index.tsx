import { useState } from "react";
import { server } from "../config";
import { Page } from "../type";

type Props = {
  pages: Page[];
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

const Pages = (props: Props) => {
  const [pages, setPages] = useState(props.pages);
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

  return (
    <>
      ページ一覧
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.id}>
              <td>{page.id}</td>
              <td
                onClick={() => {
                  if (editting.id === page.id) {
                    return;
                  }
                  setEditting({ id: page.id, name: page.name });
                }}
              >
                {editting.id === page.id ? (
                  <input
                    value={editting.name}
                    onChange={(e) =>
                      setEditting({ id: page.id, name: e.target.value })
                    }
                  />
                ) : (
                  page.name
                )}
              </td>
              <td>
                {editting.id === page.id ? (
                  <button onClick={onUpdate}>save</button>
                ) : (
                  <button onClick={() => onDelete(page.id)}>delete</button>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>new</td>
            <td>
              <input
                value={newPage.name}
                onChange={(e) => {
                  setNewPage({ name: e.target.value });
                }}
              />
            </td>
            <td>
              <button onClick={onCreate}>create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

async function getPages(): Promise<Page[]> {
  const res = await fetch(`${server}/api/pages`);
  const json = await res.json();

  return json.pages;
}

export async function getServerSideProps() {
  return {
    props: {
      pages: await getPages(),
    },
  };
}

export default Pages;
