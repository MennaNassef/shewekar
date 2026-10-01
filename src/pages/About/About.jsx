import "./AboutUs.css";

const AboutUs = () => {
  return (
    <main className="about-page">

      {/* ================= HERO ================= */}
      <section className="about-hero">

  {/* Title Outside Image */}
  <div className="about-title">
    <h1>About Us</h1>
  </div>

  {/* Image + Text */}
  <div className="about-image-wrapper">

    <img
      src="https://shewekar.com/cdn/shop/files/Contact_Us.jpg?v=1720352074&width=2560"
      alt="Shewekar"
      className="about-image"
    />

    <div className="about-overlay"></div>

    <div className="about-text">

      <h2>Refinement, Revival and Rebellion.</h2>

      <h3>Our essence is defined by those three words.</h3>

      <p>
        Whether in our interior projects or in our product design we are true
        to ourselves. Integrating heritage in a refined manner but in a
        non-traditional sense. Artistry rooted with a deep appreciation for
        our ancestry but with restraint. Our award-winning designs are a
        delicate balance between the radical and the elegant. Decades of
        experience have honed our ability to finesse, to bend the rules but
        with respect to the foundations.
      </p>

      <p>
        We design for a world of dynamic people, marrying principles of
        functionality with the avant-garde and new perspectives.
      </p>

      <p>
        We are mindful of our craft. We think about not only the design we
        make but also those who make them and those who use them. The stories
        that are weaved, the purpose they serve, and the homage paid to craft
        making. Our mission is to responsibly cultivate talent with rooted and
        aspirational design.
      </p>

      <p>
        We are propelled by the relationships we have built with local
        craftsman and material suppliers, ensuring an envisioned execution.
        We create with a dedication to distinction, to create a script like
        flow where every aspect of the design ebbs and weaves into the larger
        revelation.
      </p>

    </div>

  </div>

</section>


      {/* ================= MEET SHEWEKAR ================= */}

      <section className="meet-shewekar">

        <div className="meet-shewekar__image">
          <img
            src="https://www.hola.com/horizon/square/9b52020b8add-01-foto-eloi-camacho-2.jpg?"
            alt="Shewekar"
          />
        </div>

        <div className="meet-shewekar__content">

          <h2>Meet Shewekar</h2>

          <p>
            “It’s all in the details”, believes Shewekar, popularly known as
            Shiwi, the founder and lead designer of Shewekar design studio.
            After concluding her B.A. in Business Administration from the
            American University in Cairo, Shewekar pursued her passion for
            architecture and design. Living in Miami at the time, she decided
            to study her second B.A., in Interior Design from the Miami
            International University of Art and Design.
          </p>

          <p>
            Upon returning to Egypt in 2002, with renewed inspiration, she
            established her own studio to creatively transform what she learned
            to experiential work.
          </p>

          <p>
            In 2017, she expanded her scope of work to furniture design and
            launched Shewekar, her signature luxury furniture and exquisite
            home accessories line. Since Shewekar believes in enjoying a
            holistic lifestyle, she is also a certified nutritionist, health
            coach and philanthropist, but her true passion remains to be
            creating refined and inspiring spaces.
          </p>

          <p>
            She’s also the author of a Middle Eastern cookbook titled
            “Bilhana”, which will be out by August 2019.
          </p>

        </div>

      </section>


      {/* ================= TEAM ================= */}

      <section className="about-team">

        <div className="about-team__content">

          <p>
            Our hardworking & dedicated design team has expanded to more than
            20 passionate and detail-oriented designers and architects. Our
            team members have a deep understanding of our clients’ needs and
            maintain open communication channels throughout the entire design
            and execution processes to ensure customer satisfaction.
          </p>

        </div>

        <div className="about-team__image">
          <img
            src="https://www.visserensmitbouw.nl/sites/vw_vs_bouw/files/styles/text_image_visual/public/2023-11/team.jpg?"
            alt="Shewekar Design Team"
          />
        </div>

      </section>

    </main>
  );
};

export default AboutUs;