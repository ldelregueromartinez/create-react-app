import React from 'react';
import { Link  } from 'react-router-dom'

export const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/consultorios">Consultorios Salute!</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'/consultorios'}>Consultorios</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'/especialistas'}>Especialistas</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'/pacientes'}>Pacientes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'/historiasclinicas'}>Historias Clinicas</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to={'/asientos'}>Asientos Clinicos</Link>
        </li>

      </ul>

    </div>
  </div>
</nav>
  )
}
;



