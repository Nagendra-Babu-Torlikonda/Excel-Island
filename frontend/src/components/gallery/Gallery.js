import React from 'react';
import './gallery.css';
import G1 from '../../images/gallery1.jpg';
import G2 from '../../images/galllery2.jpg';
import G3 from '../../images/gallery5.jpg';
import G4 from '../../images/gallery3.jpg';
import G5 from '../../images/gallery4.jpg';
import G6 from '../../images/gallery6.jpg';
import G7 from '../../images/gallery7.jpg';
import G8 from '../../images/gallery8.jpg';

const Gallery = () => {
  return (
    <div class="album">
    <div class="responsive-container-block bg">
      <div class="responsive-container-block img-cont">
        <img class="img" src={G1} />
        <img class="img" src={G2} />
        <img class="img img-last" src={G3} />
      </div>
      <div class="responsive-container-block img-cont">
        <img class="img img-big" src={G4} />
        <img class="img img-big img-last" src={G5} />
      </div>
      <div class="responsive-container-block img-cont">
        <img class="img" src={G6} />
        <img class="img" src={G7} />
        <img class="img" src={G8} />
      </div>
    </div>
</div>
  )
}

export default Gallery;