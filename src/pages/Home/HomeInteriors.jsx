import React from 'react'
import  "./HomeInteriors.css"
export default function HomeInteriors() {
  return (
    <>
<section className="interiors-section">

  {/* Commercial Interiors */}
  <div className="interior-row">
    <div className="interior-content">
      <h2>Commercial Interiors</h2>

      <p>
        Over the years we have amassed a wealth of knowledge in spatial
        design, ergonomics and materials best used in commercial settings.
        Our ability lies in strong design principles, which allow us to
        create with relation to context. Our portfolio spans restaurants,
        hotels, educational institutions, offices, and retail venues.
      </p>

      <a
        href="/commercial"
        className="interior-button"
      >
        Explore Projects
      </a>
    </div>

    <div className="interior-image-wrapper">
      <img
  src="https://shewekar.com/cdn/shop/files/Beanos_GEM_10-scaled.jpg?v=1716476139&width=1110"
  alt="Commercial Interiors"
/>
    </div>
  </div>


  {/* Residential Interiors */}
  <div className="interior-row interior-row-reverse">
    <div className="interior-content">
      <h2>Residential Interiors</h2>

      <p>
        At Shewekar we take a holistic approach to our residential projects,
        originating from artistic processes and research but based on the
        lifestyle of our clients. We immerse ourselves in order to
        authentically design spaces that speak of those that inhabit them.
        We build the narratives around your stories, making all our
        residential designs truly individualistic.
      </p>

      <a
        href="/residential"
        className="interior-button"
      >
        Explore Projects
      </a>
    </div>

    <div className="interior-image-wrapper">
      <img
        src="https://shewekar.com/cdn/shop/files/Screenshot_2024-05-30_at_11.47.11_AM.png?v=1717330762&width=1110"
        alt="Residential Interiors"
      />
    </div>
  </div>

</section>

</>
  )
}
