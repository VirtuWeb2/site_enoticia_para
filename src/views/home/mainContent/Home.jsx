import React from "react";
import Regiao from "./divRegiao/Regiao";
import Side from "../../../components/sideContent/side/Side";
import "./style.css";

const Home = ({news}) => {
  return (
    <>
      <main>
        <div className="container">
          <section className="mainContent">
            <Regiao news={news} />
          </section>
          <section className="sideContent">
            <Side news={news} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
