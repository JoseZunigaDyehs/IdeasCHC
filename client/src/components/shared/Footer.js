import React from 'react';
import LogoMP2 from '../../logoChcBlanco.png'

const Footer = () => (
  <footer className="container-fluid py-5">
    <div className="row justify-content-between align-items-center">
      <div className="col-md-4">
        <img src={LogoMP2} alt="" className='img-footer'/>
      </div>
      <div className="col-md-4 pt-3">
        <p className="text-uppercase">desarrollado por la división de tecnología de la dirección de compra y contratación pública</p>
        <h1 id='firma'>Distrito 5</h1>
      </div>
    </div>
  </footer>
)

export default Footer;