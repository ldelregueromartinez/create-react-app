import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = 'https://backend-dev-ateq.4.us-1.fl0.io/especialistas/';

export class Especialistas extends Component {

    state = {
        data: [],
        modal: false,
        tipoModal: '',
        modalBorrar:false,
        modalError: false,
        form: {
            id: '',
            nombre:'',
            apellido:'',
            direccion:'',
            telefono:'',
            dni:'',
            fecha_nac:'',
            matricula:'',
            especialidad:'',
            fechaIngreso:'',
            fechaEgreso:'',
            consultorioId:''
        }
    };


    limpiarForm = async ()=> {
        this.setState({
            form: {
                id: '',
                nombre:'',
                apellido:'',
                direccion:'',
                telefono:'',
                dni:'',
                fecha_nac:'',
                matricula:'',
                especialidad:'',
                fechaIngreso:'',
                fechaEgreso:'',
                consultorioId:''
            }
        })

    };










    borrarEspecialista = async ()=> {

        await axios.delete(url + this.state.form.id, this.state.form).then(
            response=>{
                this.setState({modalBorrar:false});
                this.listadoEspecialistas();
            }
        ).catch(error => {
            if(error.response.status===400){

                this.setState({modalBorrar:false})
                this.setState({modalError:true})

            } else{console.log(error.message)}
            
        })
    }

    modificarEspecialistas = ()=> {

        axios.put(url + this.state.form.id, this.state.form).then(
            response=>{
                this.show();
                this.listadoEspecialistas();
            }
        ).catch(error => {
            console.log(error.message)
        })
    }


    seleccionarEspecialista = (especialista)=> {
        this.setState({
            tipoModal:'actualizar',
            form:{
                id: especialista.id,
                nombre:especialista.nombre,
                apellido:especialista.apellido,
                direccion:especialista.direccion,
                telefono:especialista.telefono,
                dni:especialista.dni,
                fecha_nac:especialista.fecha_nac,
                matricula:especialista.matricula,
                especialidad:especialista.especialidad,
                fechaIngreso:especialista.fechaIngreso,
                fechaEgreso:especialista.fechaEgreso,
                consultorioId:especialista.consultorioId


            }
    
        });
    
    }













    //Funcion para mostrar modal

    show = () => {
        this.setState({ modal: !this.state.modal })
    };




    //Funcion listadoEspecialistas
    listadoEspecialistas = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });

        }).catch(error => {
            console.log(error.message)
        })
    };
    //Montar la funcion listadoEspecialistas
    componentDidMount() {
        this.listadoEspecialistas();
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

    //Funcion de alta de Especialista
    altaEspecialista = async () => {
        await axios.post(url, this.state.form).then(
            response => {
                console.log(response)
                this.show();
                this.listadoEspecialistas();

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
                        Listado de Especialistas <button className='btn btn-success ms float-end' onClick={()=>{this.setState({tipoModal:'insertar'}); this.limpiarForm();  this.show()}} style={{ fontSize: 12 }}>NUEVO</button>

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
                                    <th style={{ fontSize: 12 }}>Matricula</th>
                                    <th style={{ fontSize: 12 }}>Especialidad</th>
                                    <th style={{ fontSize: 12 }}>Fecha de Ingreso</th>
                                    <th style={{ fontSize: 12 }}>Fecha de Egreso</th>
                                    <th style={{ fontSize: 12 }}>Consultorio</th>
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.data.map(especialista => {
                                    return (
                                        <tr>
                                            <td style={{ fontSize: 11 }}>{especialista.id}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.nombre}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.apellido}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.direccion}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.telefono}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.dni}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.fecha_nac}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.matricula}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.especialidad}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.fechaIngreso}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.fechaEgreso}</td>
                                            <td style={{ fontSize: 11 }}>{especialista.consultorioId}</td>
                                            <td><div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button className="btn btn-primary ms float-end" style={{ fontSize: 8 }} onClick={()=>{this.seleccionarEspecialista(especialista); this.show()}}>EDITAR</button>
                                                <button className="btn btn-danger ms float-end" style={{ fontSize: 8 }} onClick={()=>{this.seleccionarEspecialista(especialista); this.setState({modalBorrar:true})}}>BORRAR</button></div></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                        <Modal isOpen={this.state.modal} size="lg">
                            <ModalHeader toggle={this.show}>
                            Formulario de especialista
                            </ModalHeader>

                            <ModalBody >
                                <form className='form-group'>
                                    <div className='border rounded p-2 mb-3'>
                                        <div className="input-group">

                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Nombre:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Nombre' name='nombre' onChange={this.handleChange} value={form?form.nombre:""}/>
                                                </div>

                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Apellido:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Apellido' name='apellido' onChange={this.handleChange} value={form?form.apellido:""}/>
                                                </div>
                                            </div>


                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Dirección:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la Direccion' name='direccion' onChange={this.handleChange} value={form?form.direccion:""} />
                                                </div>

                                                <div className="col-3">
                                                    <label className='text-secondary badge'> DNI:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el DNI' name='dni' onChange={this.handleChange} value={form?form.dni:""} />
                                                </div>

                                                <div className="col-3">
                                                    <label className='text-secondary badge'> Matricula:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la Matricula' name='matricula' onChange={this.handleChange} value={form?form.matricula:""}/>
                                                </div>

                                               
                                            </div>



                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">


                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Fecha de Nacimiento:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la fecha de nacimiento con formato aaaa-mm-dd' name='fecha_nac' onChange={this.handleChange} value={form?form.fecha_nac:""} />
                                                </div>
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Telefono:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Teléfono' name='telefono' onChange={this.handleChange} value={form?form.telefono:""}/>
                                                </div>

                                            </div>



                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Especialidad:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la Especialidad' name='especialidad' onChange={this.handleChange}value={form?form.especialidad:""} />
                                                </div>

                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Fecha de Ingreso:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la fecha de Ingreso con formato aaaa-mm-dd' name='fechaIngreso' onChange={this.handleChange} value={form?form.fechaIngreso:""}/>
                                                </div>
                                            </div>



                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Fecha de Egreso:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese la fecha de Egreso con formato aaaa-mm-dd' name='fechaEgreso' onChange={this.handleChange} value={form?form.fechaEgreso:""} />
                                                </div>

                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Consultorio:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el consultorio' name='consultorioId' onChange={this.handleChange} value={form?form.consultorioId:""}/>
                                                </div>
                                            </div>



                                        </div>
                                    </div>

                                </form>
                            </ModalBody>

                            <ModalFooter>
                            {this.state.tipoModal==='insertar'?
                            
                            <button className='btn btn-success ms float-end"' onClick={this.altaEspecialista}>CREAR</button>
                            :
                            <button className='btn btn-success ms float-end"' onClick={this.modificarEspecialistas}>ACTUALIZAR</button>
                        }
                                 
                            <button className='btn btn-secondary ms float-end"' onClick={this.show}>CANCELAR</button>
                        </ModalFooter>
                        </Modal>


                        <Modal isOpen={this.state.modalBorrar} size="md">
                            <ModalHeader toggle={()=>(this.setState({modalBorrar:false}))}>                          
                            Eliminar Especialista       

                            </ModalHeader>


                            <ModalBody>
                                <h5 className="text-center py-4">¿Realmente deseas eliminar al especialista {form.nombre} {form.apellido}? </h5>
                            </ModalBody>

                            <ModalFooter>
                            <button className='btn btn-danger ms float-end"' onClick={()=>{this.borrarEspecialista()}}>SI</button>
                            <button className='btn btn-secondary ms float-end"' onClick={()=>{this.setState({modalBorrar:false})}}>NO</button>
                            </ModalFooter>


</Modal>













<Modal isOpen={this.state.modalError} size="md">
                            <ModalHeader toggle={()=>(this.setState({modalError:false}))}>                          
                            Error al eliminar Especialista       

                            </ModalHeader>


                            <ModalBody>
                                <h5 className="text-center py-4">No es posible eliminar al especialista {form.nombre} {form.apellido}. </h5>
                            </ModalBody>

                            <ModalFooter>
                          
                            <button className='btn btn-secondary ms float-end"' onClick={()=>{this.setState({modalError:false})}}>ACEPTAR</button>
                            </ModalFooter>


</Modal>










                    </div>
                </div >

            )
        )
    }
}
