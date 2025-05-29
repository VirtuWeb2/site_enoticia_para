import React, { useState } from "react";
import { Link } from "react-router-dom";
import Heading from "../heading/Heading";
import moment from "moment";
import DOMPurify from "dompurify";
import Share from "../share/Share";
import Pagination from "../pagination/Pagination";
import "./regiao.css";

const NewSection = ({ regionTitle, newsData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <section className="regiao">
      <div className="content">
        <Heading title={regionTitle} />

        {currentItems.map((val) => {
          return (
            <div key={val.id} className="items">
              <div className="box">
                <div className="images">
                  <div className="img">
                    <img src={val.cover} alt="" />
                  </div>
                  <div className="category category1">
                    <span>
                      <Link
                        style={{ color: "#fff" }}
                        to={val.link}
                        target="_blank"
                      >
                        {val.muni} | {val.cat}
                      </Link>
                    </span>
                  </div>
                </div>
                <div className="text">
                  <Link to={`/noticia/${val.id}`}>
                    <h1 className="title">{val.title}</h1>
                  </Link>
                  <div className="sub">
                    <p
                      className="desc"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          val.desc.length > 200
                            ? val.desc.slice(0, 200) + "..."
                            : val.desc
                        ),
                      }}
                    ></p>
                    <Share link={`/noticia/${val.id}`} />
                    <i className="fas fa-calendar-days"></i>
                    <label>{moment(val.date).format("DD-MM-YYYY")}</label>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={newsData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
};

export default NewSection;
