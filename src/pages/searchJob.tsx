import * as React from "react";
import { useEffect, useState } from "react";
import ButtonComponent from "../components/shared/atom/button";
import {
  Txtfield,
  DropdownMenu,
  DropdownItem,
} from "../components/shared/styled";
import Header from "../components/shared/header";

import "./../sass/pages/_login.scss";
import "./../sass/components/_hero.scss";

import { Category } from "../interfaces/Category";
import { Position } from "../interfaces/Position";

import { getCategory, getPosition } from "../util/publication.service";

//LIST-POST
import "./../sass/components/_listPost.scss";
import { usePostJob } from "../hooks/usePostJob";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Pagination } from "../components/Pagination";

export default function SearchJob() {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  let [newPost,setNewPost] = useState([]);
  const [category, setCategory] = useState("");

  const [position, setPosition] = useState("");

  const getAllCategories = async () => {
    const c = await getCategory();
    console.log({ c });
    if (c.status) setCategorys(c?.data);
  };

  const handleCategory = async (e: any) => {
    const value = e.target.value;

    setCategory(value);
    setPositions([]);

    if (value !== "0") {
      // setPosition({ ...position, idCategory: value });
      //const p = await getPosition({ idCategory: value });
      //setPositions(p.data);
      filterPost(value, position);
    }
  };

  const filterPost = async (idC, idP) => {
    console.log(idC);
    console.log(idP);

    if (idP === "" || idP == undefined || idP == null) {
      const data = postJobs.filter((p) => p.idCategory === idC);
      console.log("postfiltrados", data);
      setNewPost(data);
    } else {
      const data = postJobs.filter(
        (p) => p.idCategory === idC && p.idPosition === idP
      );
      console.log("postfiltrados", data);
      setNewPost(data);
    }
  };

  useEffect(() => {
    (async () => {
      await getAllCategories();
    })();
  }, []);

  //LIST-POST
  let {postJobsState: { loading, postJobs },} = usePostJob();

  let [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    if (postJobs.length > 0) {
      console.log("postJobs", postJobs);
      setLoadingPost(true);
    }
  }, [postJobs]);

  return (
    <React.Fragment>
      <Header />
      <section className="LoginPage pt-1">
        <h1>Buscar empleo</h1>
      </section>
      <aside className="filterSection">
        <DropdownMenu name="category" onChange={handleCategory}>
          <DropdownItem value="_none">Seleccionar Categoría</DropdownItem>

          {categorys.map((category: Category) => (
            <DropdownItem key={category._id} value={category._id}>
              {category.nameCategory}
            </DropdownItem>
          ))}
        </DropdownMenu>

        <DropdownMenu name="position">
          <DropdownItem>Eliga el puesto</DropdownItem>
          {positions.map((e: any) => (
            <DropdownItem key={e._id} value={e._id}>
              {e.namePosition}
            </DropdownItem>
          ))}
        </DropdownMenu>

        <Txtfield placeholder="Ubicación" />
        <ButtonComponent family="primary" label="FILTRAR" />
      </aside>

      <>
        <Backdrop
          open={loading!}
          style={{
            zIndex: 99,
          }}
        >
          {" "}
          .
          <CircularProgress color="inherit" />
        </Backdrop>
        <section className="ListPostComponent">
          <aside className="mb-5"></aside>
          {loadingPost ? (


            
            (category !== "" )?
            <Pagination postJobs={newPost} itemsPerPage={4} key={2} />:
            <Pagination postJobs={postJobs} itemsPerPage={4} key={1} />
          



          ) : (
            <></>
          )}

         
        </section>
        <br/>
        <br/>
        <br/>
      </>
    </React.Fragment>
  );
}
