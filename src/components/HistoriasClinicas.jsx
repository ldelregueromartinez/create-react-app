import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

const url = 'https://backend-dev-ateq.4.us-1.fl0.io/historiasclinicas/';

export class HistoriasClinicas extends Component {

    state = {
        data: [],
        modal: false,
        tipoModal: '',
        modalBorrar:false,
        modalError: false,
        form: {
            id: '',
            pacienteId:'',
            asientoclinicoId:''
        }
    };




    limpiarForm = async ()=> {
      await  this.setState({
            form: {
                id: '',
                pacienteId:'',
                asientoclinicoId:''
            }
        })

    };


    modificarHistoriasClinicas = async ()=> {

     await   axios.put(url + this.state.form.id, this.state.form).then(
            response=>{
                this.show();
                this.listadoHistoriasClinicas();
            }
        ).catch(error => {
            console.log(error.message)
        })
    }


    seleccionarHistoriaClinica = async (historiaclinica)=> {
      await  this.setState({
            tipoModal:'actualizar',
            form:{
                id: historiaclinica.id,
                pacienteId:historiaclinica.pacienteId,
                asientoclinicoId: historiaclinica.asientoclinicoId
            }
    
        });
    
    }

    borrarHistoriaClinica = async ()=> {

        await axios.delete(url + this.state.form.id, this.state.form).then(
            response=>{
                this.setState({modalBorrar:false});
                this.listadoHistoriasClinicas();
            }
        ).catch(error => {
            if(error.response.status===400){
                this.setState({modalBorrar:false})
                this.setState({modalError:true})
            } else{console.log(error.message)}
        })
    }











    //Funcion para mostrar modal

    show = () => {
        this.setState({ modal: !this.state.modal })
    };




    //Funcion listadoHistoriasClinicas
    listadoHistoriasClinicas = async () => {
     await   axios.get(url).then(response => {
            this.setState({ data: response.data });

        }).catch(error => {
            console.log(error.message)
        })
    };
    //Montar la funcion listadoHistoriasClinicas
    componentDidMount() {
        this.listadoHistoriasClinicas();
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

    //Funcion de alta de HistoriaClinica
    altaHistoriaClinica = async () => {
        await axios.post(url, this.state.form).then(
            response => {
                console.log(response)
                this.show();
                this.listadoHistoriasClinicas();

            }
        ).catch(error => {
            console.log(error.message)
        })
    };




    render() {
        const {form}=this.state;
        return (
            (

                <div className="w-50 m-auto">
                    <h2 className="h2 text-center mb-4">
                        Listado de Historias Clinicas <button className='btn btn-success ms float-end' onClick={()=>{this.setState({tipoModal:'insertar'}); this.limpiarForm();  this.show()}} style={{ fontSize: 12 }}>NUEVA</button>

                    </h2>

                    <hr />

                    <div class="table-table-sm">
                        <table className='table table-striped text-center align-middle' >
                            <thead>
                                <tr>
                                    <th style={{ fontSize: 12 }}>ID</th>
                                    <th style={{ fontSize: 12 }}>Paciente</th>
                                    <th style={{ fontSize: 12 }}>Asiento</th>                        
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.data.map(historiaclinica => {
                                    return (
                                        <tr>
                                            <td style={{ fontSize: 11 }}>{historiaclinica.id}</td>
                                            <td style={{ fontSize: 11 }}>{historiaclinica.pacienteId}</td>
                                            <td style={{ fontSize: 11 }}>{historiaclinica.asientoclinicoId}</td>
                                            <td><div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button className="btn btn-primary ms float-end" style={{ fontSize: 8 }} onClick={()=>{this.seleccionarHistoriaClinica(historiaclinica); this.show()}}>EDITAR</button>
                                                <button className="btn btn-danger ms float-end" style={{ fontSize: 8 }} onClick={()=>{this.seleccionarHistoriaClinica(historiaclinica); this.setState({modalBorrar:true})}} >BORRAR</button></div></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                        <Modal isOpen={this.state.modal} size="lg">
                            <ModalHeader toggle={this.show}>
                            Formulario de Historia Clinica
                            </ModalHeader>

                            <ModalBody >
                                <form className='form-group'>
                                    <div className='border rounded p-2 mb-3'>
                                        <div className="input-group">

                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Paciente:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Paciente' name='pacienteId' onChange={this.handleChange} value={form?form.pacienteId:""} />
                                                </div>

                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Asiento:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Asiento' name='asientoclinicoId' onChange={this.handleChange} value={form?form.asientoclinicoId:""} />
                                                </div>
                                            </div>
                                           
                                            </div>
                                        </div>
                                   

                                </form>
                            </ModalBody>

                            <ModalFooter>
                            {this.state.tipoModal==='insertar'?
                            
                            <button className='btn btn-success ms float-end"' onClick={this.altaHistoriaClinica}>CREAR</button>
                            :
                            <button className='btn btn-success ms float-end"' onClick={this.modificarHistoriasClinicas}>ACTUALIZAR</button>
                        }
                                 
                            <button className='btn btn-secondary ms float-end"' onClick={this.show}>CANCELAR</button>
                        </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.modalBorrar} size="md">
                            <ModalHeader toggle={()=>(this.setState({modalBorrar:false}))}>                          
                            Eliminar Historia Clínica       

                            </ModalHeader>


                            <ModalBody>
                                <h5 className="text-center py-4">¿Realmente deseas eliminar la Historia Clínica del paciente  {form.pacienteId}? </h5>
                            </ModalBody>

                            <ModalFooter>
                            <button className='btn btn-danger ms float-end"' onClick={()=>{this.borrarHistoriaClinica()}}>SI</button>
                            <button className='btn btn-secondary ms float-end"' onClick={()=>{this.setState({modalBorrar:false})}}>NO</button>
                            </ModalFooter>


</Modal>




<Modal isOpen={this.state.modalError} size="md">
                            <ModalHeader toggle={()=>(this.setState({modalError:false}))}>                          
                           Error al eliminar Historia Clínica    

                            </ModalHeader>


                            <ModalBody>
                                <h5 className="text-center py-4">No es posible eliminar la Historia Clínica del paciente  {form.pacienteId}. </h5>
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
