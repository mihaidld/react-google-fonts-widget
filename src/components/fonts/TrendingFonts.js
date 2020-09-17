import React, { useEffect, useState } from "react";
import Font from "./Font";

const TrendingFonts = () => {
  const [listTrending, setListTrending] = useState([]);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_GOOGLEFONTS_API_KEY;
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=trending`;

    fetch(url)
      .then((response) => {
        console.log("objet Response : ", response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("HTTP request problem");
      })
      .then((data) => {
        console.log("body format JSON : ", data);
        let list = [];
        for (let i = 0; i < 10; i++) {
          list.push({
            name: data.items[i].family,
            numberVariants: data.items[i].variants.length,
            category: data.items[i].category,
            link: `https://fonts.google.com/specimen/${data.items[i].family
              .split(" ")
              .join("+")}`,
          });
        }
        setListTrending(list);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  console.log("10 fonts les plus en hausse : ", listTrending);

  return (
    <section className="row mb-5">
      <hr></hr>
      <h2 className="mb-3">
        <span className="badge bg-danger">Trending Fonts</span>
      </h2>
      {listTrending.map((element) => {
        return (
          <Font
            key={element.name}
            name={element.name}
            numberVariants={element.numberVariants}
            category={element.category}
            link={element.link}
          />
        );
      })}
    </section>
  );
};

export default TrendingFonts;
