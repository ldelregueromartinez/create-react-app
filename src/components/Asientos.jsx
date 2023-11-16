import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = 'https://backend-dev-ateq.4.us-1.fl0.io/asientos/';

export class Asientos extends Component {

    state = {
        data: [],
        modal: false,
        tipoModal: '',
        modalBorrar:false,
        form: {
            id: '',
            fecha:'',
            antecedentes:'',
            acto_profesional:'',
            otras_informaciones:'',
            pacienteId:'',
            especialistaId:''

        }
    };


    modificarAsiento = ()=> {

        axios.put(url + this.state.form.id, this.state.form).then(
            response=>{
                this.show();
                this.listadoAsientos();
            }
        ).catch(error => {
            console.log(error.message)
        })
    }


    seleccionarAsiento = (asiento)=> {
        this.setState({
            tipoModal:'actualizar',
            form:{
                id: asiento.id,
                fecha:asiento.fecha,
                antecedentes:asiento.antecedentes,
                acto_profesional:asiento.acto_profesional,
                otras_informaciones:asiento.otras_informaciones,
                pacienteId:asiento.pacienteId,
                especialistaId:asiento.especialistaId
            }
    
        });
    
    }














    //Funcion para mostrar modal

    show = () => {
        this.setState({ modal: !this.state.modal })
    };




    //Funcion listadoAsientos
    listadoAsientos = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });

        }).catch(error => {
            console.log(error.message)
        })
    };
    //Montar la funcion listadoAsientos
    componentDidMount() {
        this.listadoAsientos();
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

    //Funcion de alta de Asientos
    altaAsiento = async () => {
        await axios.post(url, this.state.form).then(
            response => {
                console.log(response)
                this.show();
                this.listadoAsientos();
                

            }
        ).catch(error => {
            console.log(error.message)
        })
    };




    render() {
        const {form}=this.state;
        return (
            (


                <div className="w-100 m-auto">
                    <h2 className="h2 text-center mb-4">
                        Listado de Asientos <button className='btn btn-success ms float-end' onClick={()=>{this.setState({tipoModal:'insertar'}); this.show()}} style={{ fontSize: 12 }}>NUEVO</button>

                    </h2>

                    <hr />

                    <div class="table-table-sm">
                        <table className='table table-striped text-center align-middle' >
                            <thead>
                                <tr>
                                    <th style={{ fontSize: 12 }}>ID</th>
                                    <th style={{ fontSize: 12 }}>Fecha</th>
                                    <th style={{ fontSize: 12 }}>Antecedentes</th>
                                    <th style={{ fontSize: 12 }}>Acto Profesional</th>
                                    <th style={{ fontSize: 12 }}>Otras Informaciones</th>
                                    <th style={{ fontSize: 12 }}>Paciente</th>
                                    <th style={{ fontSize: 12 }}>Especialista</th>
 
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.data.map(asiento => {
                                    return (
                                        <tr>
                                            <td style={{ fontSize: 11 }}>{asiento.id}</td>
                                            <td style={{ fontSize: 11 }}>{asiento.fecha}</td>
                                            <td style={{ fontSize: 11 }}>{asiento.antecedentes}</td>
                                            <td style={{ fontSize: 11 }}>{asiento.acto_profesional}</td>
                                            <td style={{ fontSize: 11 }}>{asiento.otras_informaciones}</td>
                                            <td style={{ fontSize: 11 }}>{asiento.pacienteId}</td>
                                            <td style={{ fontSize: 11 }}>{asiento.especialistaId}</td>
 
                                            <td><div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button className="btn btn-primary ms float-end" style={{ fontSize: 8 }} onClick={()=>{this.seleccionarAsiento(asiento); this.show()}}>EDITAR</button>
                                                <button className="btn btn-danger ms float-end" style={{ fontSize: 8 }} onClick={()=>{this.seleccionarAsiento(asiento); this.setState({modalBorrar:true})}}>BORRAR</button></div></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                        <Modal isOpen={this.state.modal} size="lg">
                            <ModalHeader toggle={this.show}>
                            Formulario de Asiento Clínico
                            </ModalHeader>

                            <ModalBody >
                                <form className='form-group'>
                                    <div className='border rounded p-2 mb-3'>
                                        <div className="input-group">

                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Fecha:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la Fecha con formato aaaa-mm-dd' name='fecha' onChange={this.handleChange}  value={form?form.fecha:""} />
                                                </div>

                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Antecedentes:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese Antecedentes' name='antecedentes' onChange={this.handleChange} value={form?form.antecedentes:""}/>
                                                </div>
                                            </div>


                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Acto Profesional:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Acto Profesional' name='acto_profesional' onChange={this.handleChange} value={form?form.acto_profesional:""} />
                                                </div>

                                                <div className="col-3">
                                                    <label className='text-secondary badge'> Otras Informaciones:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese otra información relevante' name='otras_informaciones' onChange={this.handleChange} value={form?form.otras_informaciones:""}/>
                                                </div>

                                                <div className="col-3">
                                                    <label className='text-secondary badge'> Paciente:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Paciente' name='pacienteId' onChange={this.handleChange}  value={form?form.pacienteId:""}/>
                                                </div>

                                               
                                            </div>



                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">


                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Especialista:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Especialista' name='especialistaId' onChange={this.handleChange} value={form?form.especialistaId:""}/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </form>
                            </ModalBody>

                            <ModalFooter>
                            {this.state.tipoModal==='insertar'?
                            
                            <button className='btn btn-success ms float-end"' onClick={this.altaAsiento}>CREAR</button>
                            :
                            <button className='btn btn-success ms float-end"' onClick={this.modificarAsiento}>ACTUALIZAR</button>
                        }
                                 
                            <button className='btn btn-secondary ms float-end"' onClick={this.show}>CANCELAR</button>
                        </ModalFooter>
                        </Modal>


                        <Modal isOpen={this.state.modalBorrar} size="lg">
                            <ModalHeader toggle={()=>(this.setState({modalBorrar:false}))}>                          
                            Eliminar Asiento Clínico    

                            </ModalHeader>


                            <ModalBody>
                                <h5 className="text-center py-4">¿Realmente deseas eliminar el Asiento Clínico del paciente {form.pacienteId}  con fecha {form.fecha}? </h5>
                            </ModalBody>

                            <ModalFooter>
                            <button className='btn btn-danger ms float-end"' onClick={this.show}>SI</button>
                            <button className='btn btn-secondary ms float-end"' onClick={()=>(this.setState({modalBorrar:false}))}>NO</button>
                            </ModalFooter>


</Modal>




                    </div>
                </div >

            )
        )
    }
}
