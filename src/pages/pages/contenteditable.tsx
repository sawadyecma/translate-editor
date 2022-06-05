import { usePages } from "../../hooks/usePages";
import { getPages } from "../../rpc/page";
import { Page } from "../../type";

type Props = {
  pages: Page[];
};

const ContentEditable = (props: Props) => {
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
              <td>
                <div
                  onClick={() => onPageSelect(page)}
                  contentEditable
                  onChange={(e) => {
                    console.log(e);
                    onPageChange(e.currentTarget.nodeValue ?? "");
                  }}
                  onInput={(e) => {
                    const value = e.currentTarget.innerHTML;
                    onPageChange(value);
                  }}
                  suppressContentEditableWarning
                  dangerouslySetInnerHTML={{
                    __html: editting.id === page.id ? editting.name : page.name,
                  }}
                />
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
              <div
                contentEditable
                onInput={(e) => {
                  onNewPageChange(e.currentTarget.innerHTML);
                }}
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{
                  __html: newPage.name,
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

export default ContentEditable;
