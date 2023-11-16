import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = 'https://backend-dev-ateq.4.us-1.fl0.io/pacientes/';

export class Pacientes extends Component {

    state = {
        data: [],
        modal: false,
        form: {
            nombre:'',
            apellido:'',
            direccion:'',
            telefono:'',
            dni:'',
            fecha_nac:'',
            fechaIngreso:'',
            fechaEgreso:'',
            especialistaId:''
        }
    };

    //Funcion para mostrar modal

    show = () => {
        this.setState({ modal: !this.state.modal })
    };




    //Funcion listadoPacientes
    listadoPacientes = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });

        }).catch(error => {
            console.log(error.message)
        })
    };
    //Montar la funcion listadoPacientes
    componentDidMount() {
        this.listadoPacientes();
    };





    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    };

    //Funcion de alta de Paciente
    altaPaciente = async () => {
        await axios.post(url, this.state.form).then(
            response => {
                console.log(response)
                this.show();
                this.listadoPacientes();

            }
        ).catch(error => {
            console.log(error.message)
        })
    };




    render() {
        return (
            (


                <div className="w-100 m-auto">
                    <h2 className="h2 text-center mb-4">
                        Listado de Pacientes <button className='btn btn-success ms float-end' onClick={this.show} style={{ fontSize: 12 }}>NUEVO</button>

                    </h2>

                    <hr />

                    <div class="table-table-sm">
                        <table className='table table-striped text-center align-middle' >
                            <thead>
                                <tr>
                                    <th style={{ fontSize: 12 }}>ID</th>
                                    <th style={{ fontSize: 12 }}>Nombre</th>
                                    <th style={{ fontSize: 12 }}>Apellido</th>
                                    <th style={{ fontSize: 12 }}>Dirección</th>
                                    <th style={{ fontSize: 12 }}>Teléfono</th>
                                    <th style={{ fontSize: 12 }}>DNI</th>
                                    <th style={{ fontSize: 12 }}>Fecha de Nacimiento</th>
                                    <th style={{ fontSize: 12 }}>Fecha de Ingreso</th>
                                    <th style={{ fontSize: 12 }}>Fecha de Egreso</th>
                                    <th style={{ fontSize: 12 }}>Especialista</th>
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.data.map(paciente => {
                                    return (
                                        <tr>
                                            <td style={{ fontSize: 11 }}>{paciente.id}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.nombre}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.apellido}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.direccion}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.telefono}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.dni}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.fecha_nac}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.fechaIngreso}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.fechaEgreso}</td>
                                            <td style={{ fontSize: 11 }}>{paciente.especialistaId}</td>
                                            <td><div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button className="btn btn-primary ms float-end" style={{ fontSize: 8 }}>EDITAR</button>
                                                <button className="btn btn-danger ms float-end" style={{ fontSize: 8 }}>BORRAR</button></div></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                        <Modal isOpen={this.state.modal} size="lg">
                            <ModalHeader toggle={this.show}>
                                Creación de paciente
                            </ModalHeader>

                            <ModalBody >
                                <form className='form-group'>
                                    <div className='border rounded p-2 mb-3'>
                                        <div className="input-group">

                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Nombre:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Nombre' name='nombre' onChange={this.handleChange} />
                                                </div>

                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Apellido:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Apellido' name='apellido' onChange={this.handleChange} />
                                                </div>
                                            </div>


                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Dirección:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la Direccion' name='direccion' onChange={this.handleChange} />
                                                </div>

                                                <div className="col-6">
                                                    <label className='text-secondary badge'> DNI:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el DNI' name='dni' onChange={this.handleChange} />
                                                </div>                                               
                                            </div>



                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">


                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Fecha de Nacimiento:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la fecha de nacimiento' name='fecha_nac' onChange={this.handleChange} />
                                                </div>
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Telefono:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Teléfono' name='telefono' onChange={this.handleChange} />
                                                </div>

                                            </div>



                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">


                                                <div className="col-3">
                                                    <label className='text-secondary badge'> Fecha de Ingreso:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la fecha de Ingreso' name='fechaIngreso' onChange={this.handleChange} />
                                                </div>

                                                <div className="col-3">
                                                    <label className='text-secondary badge'> Fecha de Egreso:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la fecha de Egreso' name='fechaEgreso' onChange={this.handleChange} />
                                                </div>
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Especialista:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el cespecialista' name='especialistaId' onChange={this.handleChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </ModalBody>

                            <ModalFooter>
                                <button className='btn btn-success ms float-end"' onClick={this.altaPaciente}>CREAR</button>
                                <button className='btn btn-secondary ms float-end"' onClick={this.show}>CANCELAR</button>
                            </ModalFooter>
                        </Modal>



                    </div>
                </div >

            )
        )
    }
}
