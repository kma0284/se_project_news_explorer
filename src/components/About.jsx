import authorImage from "../assets/placeholder.jpg";
import "../blocks/About.css";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <img className="about__image" src={authorImage} alt="Author" />

        <div className="about__text">
          <h2 className="about__title">About the author</h2>

          <p className="about__description">
            Hello my name is Katelynn. This project was created as part of my
            software engineering journey. I built News Explorer to make it easy
            to search for current news, discover interesting articles, and save
            stories to read later.
          </p>

          <p className="about__description">
            The project combines React, JavaScript, CSS, and a news API to
            create a responsive application focused on a simple and useful
            reading experience.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
