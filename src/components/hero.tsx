import * as React from "react";
import { useEffect, useState } from "react";
import "./../sass/components/_hero.scss";
import ButtonComponent from "./shared/atom/button";
import { Txtfield, DropdownMenu, DropdownItem } from "./shared/styled";
import { Category } from "../interfaces/Category";
import { Position } from "../interfaces/Position";
import { useNavigate } from "react-router-dom";
import { getCategory, getPosition } from "../util/publication.service";

export default function Hero() {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [idCategorySelected, setIdCategorySelected] = useState("");
  const [position, setPosition] = React.useState({
		idCategory: '',
		namePosition: '',
		description: '',
	});
  //Get all categorys
  const getAllCategories = async () => {
    const c = await getCategory();
    console.log({ c });
    if (c.status) setCategorys(c?.data);
  };

  const handleCategory = async (e: any) => {
    const value = e.target.value;
    setIdCategorySelected(value);
   // setPositions([]);
   // if (value !== "0") {
    //  setPosition({ ...position, idCategory: value });
   //   const p = await getPosition({ idCategory: value });
    //  setPositions(p.data);
   // }
  };

  useEffect(() => {
    (async () => {
      await getAllCategories();
    })();
  }, []);

  const navigate = useNavigate();
  /**
   * Handle redirects to user register form.
   */
  const handleRedirect = () => {
    navigate("/register");
  };
  return (
    <React.Fragment>
      <div className="secFull">
        <section className="HeroComponent">
          <aside className="cover">
            <article>
              <h1>
                <b>
                  EL INICIO DE TU <br /> PRÓXIMO TRABAJO
                </b>
              </h1>
              <div className="btnContainer">
                <ButtonComponent family="hero1" label="Chambear" link={"/login/"} />
                <ButtonComponent family="hero2" label="Quiero buscar chamberos" link={"/corporativo/"}/>
              </div>
            </article>
          </aside>
        </section>
      </div>
      <aside className="filterSection">
        <DropdownMenu name="category" onChange={handleCategory}>
          <DropdownItem value="_none">Seleccionar Categoría</DropdownItem>

          {categorys.map((category: Category) => (
            <DropdownItem key={category._id} value={category._id}>
              {category.nameCategory}
            </DropdownItem>
          ))}
        </DropdownMenu>

        <DropdownMenu name="position" >
							<DropdownItem>Eliga el puesto</DropdownItem>
							{positions.map((e: any) => (
								<DropdownItem key={e._id} value={e._id}>
								{e.namePosition}
								</DropdownItem>
								))}
						</DropdownMenu>

        <Txtfield placeholder="Ubicación" />
        <ButtonComponent family="primary" label="FILTRAR" link={"/searchjob/" + idCategorySelected }/>
      </aside>
    </React.Fragment>
  );
}
