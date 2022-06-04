import { usePages } from "../../hooks/usePages";
import { getPages } from "../../rpc/page";
import { Page } from "../../type";

type Props = {
  pages: Page[];
};

const Pages = (props: Props) => {
  const {
    state: { pages, newPage, editting },
    handlers: {
      onUpdate,
      onCreate,
      onDelete,
      onPageSelect,
      onPageChange,
      onNewPageChange,
    },
  } = usePages({ initialPages: props.pages });

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
              <td onClick={() => onPageSelect(page)}>
                {editting.id === page.id ? (
                  <input
                    value={editting.name}
                    onChange={(e) => onPageChange(e.target.value)}
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
                  onNewPageChange(e.target.value);
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

export async function getServerSideProps() {
  return {
    props: {
      pages: await getPages(),
    },
  };
}

export default Pages;
