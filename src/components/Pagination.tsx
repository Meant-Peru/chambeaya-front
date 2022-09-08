import * as React from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { TagComponent } from "./shared/atom/tag";
import ButtonComponent from "./shared/atom/button";
import { get } from "lodash";
import Logo1 from "./../assets/logos/1.svg";

export const Pagination = ({ postJobs, itemsPerPage }) => {
  const [currentItems, setCurrentItems] = React.useState(null);
  const [pageCount, setPageCount] = React.useState(0);
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log("postJobs***********", postJobs);
    setCurrentItems(postJobs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(postJobs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, postJobs]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % postJobs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems &&
        currentItems.map((post: any) => (
          <aside key={Math.random()}>
            <article>
              <aside className="logoBrand">
                <img src={Logo1} alt="" />
              </aside>
              <div className="rContent row">
                <aside className="title">
                  <p>{get(post, "title", "")}</p>
                  {get(post, "state", false) && (
                    <TagComponent
                      tag={{ nameSkill: "Destacado" }}
                      type="highlight"
                      level="dark"
                      label="Destacado"
                    />
                  )}
                </aside>
                <aside className="ubication">
                  <p>Lima, Perú</p>
                </aside>
                <aside className="actions">
                  <ButtonComponent
                    link={"/detail-post/" + get(post, "_id", "")}
                    family="btnCta"
                    label="APLICAR"
                  />
                </aside>
              </div>
            </article>
          </aside>
        ))}
      <div className="react-paginate">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};
