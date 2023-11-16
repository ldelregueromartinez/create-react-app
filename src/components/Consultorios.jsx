import React, { Component } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

const url = 'https://backend-dev-ateq.4.us-1.fl0.io/consultorios/';


export class Consultorios extends Component {

    state = {
        data: [],
        tipoModal: '',
        modalBorrar:false,
        modalError: false,
        modal: false,
        form: {
            id: '',
            piso: '',
            numero: ''
        }
    };




    borrarConsultorio = async ()=> {

        await axios.delete(url + this.state.form.id, this.state.form).then(
            response=>{
                this.setState({modalBorrar:false});
                this.listadoConsultorios();
            }
        ).catch(error => {
            if(error.response.status===400){
                this.setState({modalBorrar:false})
                this.setState({modalError:true})
            } else{console.log(error.message)}
        })
    }


modificarConsultorio = async ()=> {

 await   axios.put(url + this.state.form.id, this.state.form).then(
        response=>{
            this.show();
            this.listadoConsultorios();
        }
    ).catch(error => {
        console.log(error.message)
    })
}









seleccionarConsultorio = (consultorio)=> {
    this.setState({
        tipoModal:'actualizar',
        form:{
            id: consultorio.id,
            piso: consultorio.piso,
            numero: consultorio.numero 
        }

    });

}












    //Funcion para mostrar modal

    show = () => {
        this.setState({ modal: !this.state.modal })
    };




    //Funcion listadoConsultorios
    listadoConsultorios = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });

        }).catch(error => {
            console.log(error.message)
        })
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

    //Funcion de alta de Consultorio
    altaConsultorio = async () => {
        await axios.post(url, this.state.form).then(
            response => {
                console.log(response)
                this.show();
                this.listadoConsultorios();

            }
        ).catch(error => {
            console.log(error.message)
        })
    };



    //Montar la funcion listadoConsultorios
    componentDidMount() {
        this.listadoConsultorios();
    };




    render() {
        const {form}=this.state;
        return (
            (


                <div className="w-50 m-auto">
                    <h2 className="h2 text-center mb-4">
                        Listado de Consultorios <button className='btn btn-success ms float-end' onClick={()=>{this.setState({tipoModal:'insertar'}); this.show()}} style={{ fontSize: 12 }}>NUEVO</button>
                    </h2>

                    <hr />

                    <div class="table-table-sm">
                        <table className='table table-striped text-center align-middle' >
                            <thead>
                                <tr>
                                    <th style={{ fontSize: 12 }}>ID</th>
                                    <th style={{ fontSize: 12 }}>Piso</th>
                                    <th style={{ fontSize: 12 }}>Número</th>
                                    <th style={{ fontSize: 12 }}>Acciones</th>
                                </tr>

                            </thead>
                            <tbody>
                                {this.state.data.map(consultorio => {
                                    return (
                                        <tr>
                                            <td style={{ fontSize: 11 }}>{consultorio.id}</td>
                                            <td style={{ fontSize: 11 }}>{consultorio.piso}</td>
                                            <td style={{ fontSize: 11 }}>{consultorio.numero}</td>
                                            <td><div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button className="btn btn-primary ms float-end" style={{ fontSize: 8 }} onClick={()=>{this.seleccionarConsultorio(consultorio); this.show()}}>EDITAR</button>
                                                <button className="btn btn-danger ms float-end" style={{ fontSize: 8 }} onClick={()=>{this.seleccionarConsultorio(consultorio); this.setState({modalBorrar:true})}}>BORRAR</button></div></td>
                                        </tr>
                                    )
                                })}
                                

                            </tbody>
                        </table>

                        <Modal isOpen={this.state.modal} size="lg">
                            <ModalHeader toggle={this.show}>
                           
                           
                             Formulario de consultorio          




                            </ModalHeader>

                            <ModalBody >
                                <form className='form-group'>
                                    <div className='border rounded p-2 mb-3'>
                                        <div className="input-group">

                                            <div className="col-xs-12 col-md-3 input-group input-group-sm">
                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Piso:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el Piso' name='piso' onChange={this.handleChange}  value={form?form.piso:""}  />
                                                </div>

                                                <div className="col-6">
                                                    <label className='text-secondary badge'> Número:</label>
                                                    <input type="text" className='form-control mb-2' placeholder='Ingrese el numero' name='numero' onChange={this.handleChange}  value={form?form.numero:""} />
                                                </div>
                                            </div>                                         


                                    </div>
                                </div>

                            </form>
                        </ModalBody>

                        <ModalFooter>
                            {this.state.tipoModal==='insertar'?                            
                            <button className='btn btn-success ms float-end"' onClick={this.altaConsultorio}>CREAR</button>
                            :
                            <button className='btn btn-success ms float-end"' onClick={this.modificarConsultorio}>ACTUALIZAR</button>
                        }
                                 
                            <button className='btn btn-secondary ms float-end"' onClick={this.show}>CANCELAR</button>
                        </ModalFooter>
                    </Modal>




                    <Modal isOpen={this.state.modalBorrar} size="md">
                            <ModalHeader toggle={()=>(this.setState({modalBorrar:false}))}>                          
                            Eliminar Consultorio       

                            </ModalHeader>


                            <ModalBody>
                                <h5 className="text-center py-4">¿Realmente deseas eliminar el consultorio N° {form.numero}  del piso {form.piso}? </h5>
                            </ModalBody>

                            <ModalFooter>
                            <button className='btn btn-danger ms float-end"' onClick={()=>{this.borrarConsultorio()}}>SI</button>
                            <button className='btn btn-secondary ms float-end"' onClick={()=>{this.setState({modalBorrar:false})}}>NO</button>
                            </ModalFooter>


</Modal>



<Modal isOpen={this.state.modalError} size="md">
                            <ModalHeader toggle={()=>(this.setState({modalError:false}))}>                          
                            Error al eliminar Consultorio      

                            </ModalHeader>


                            <ModalBody>
                                <h5 className="text-center py-4">No es posible eliminar el consultorio N° {form.numero}  del piso {form.piso}. </h5>
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
