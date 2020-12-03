console.log('probando')
var acompañante = document.getElementsByName('insertarAcompañante'); 
var pacientes = document.getElementsByName('infopaciente');
var citas = document.getElementsByName('forma_citas');
var doctores = document.getElementsByName('infodoctor');
var laboratorio = document.getElementsByName('laboratorio_insertar');
var medicamento = document.getElementsByName('medicamento_insertar');
var registrador = document.getElementsByName('info_registradores');
var buscarcita = document.getElementsByName('buscar_citas');
var buscarpaciente = document.getElementsByName('buscar_paciente');
var buscardoctor = document.getElementsByName('mostrar_doctor_especifico');
var buscarmedicamento = document.getElementsByName('buscar_medicamente_eninventario')
var buscarregistrador = document.getElementsByName('buscando_registrador');
var buscarhistorial = document.getElementsByName('historial_de_cistas');
var buscarinventario = document.getElementsByName('buscar_medicamento_en_el_inventario');
var informebarrios = document.getElementsByName('informe_barrios');
var buscartelefonos = document.getElementsByName('buscar_telefono_acompañante');
var informedoctor = document.getElementsByName('informe_de_doctor');

acompañante[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(acompañante[0]);

  let idacompañante = datos.get('identificacion');
  let nombreacompañante = datos.get('nombre');
  let correoelectronico = datos.get('correo');
  let telefonoacompañante = datos.get('telefono');
  let pacienteacompañante = datos.get('paciente');
  let parentescoacmopañante = datos.get('parentesco');


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'Numid': idacompañante,
      'Nombre_acompañante': nombreacompañante,
      'Correo': correoelectronico,
      'Telefono':telefonoacompañante,
      'Nombre_paciente': pacienteacompañante,
      'Parentesco': parentescoacmopañante
    }),
  }

  fetch('/basedatos/insertaracompanante', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

/////////////////////////////////////PACIENTES/////////////////////////////////
var opcionbotonpaciente = '';
var metodopaciente = '';

function insertarpaciente(){

  opcionbotonpaciente = '/basedatos/insertarpaciente';
  metodopaciente = 'PUT';
  console.log('insertar');
  console.log(opcionbotonpaciente);
  console.log(metodopaciente);

}

function actualizarpaciente(){

  opcionbotonpaciente = '/basedatos/actualizarpaciente';
  metodopaciente = 'POST';
  console.log('actualizar');
  console.log(opcionbotonpaciente);
  console.log(metodopaciente);
}


pacientes[0].addEventListener('submit', function (e) {

  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(pacientes[0]);

  let idpaciente = datos.get('identificacion_p');
  let tipopaciente = datos.get('tipo_paciente');
  let nombrepaciente = datos.get('nombre_paciente');
  let nombredoctor = datos.get('nombre_doctor');
  let roomies = datos.get('roomies');
  let edad = datos.get('edad_paciente');
  let ciudad = datos.get('ciudades');
  let barrio = datos.get('barrios');
  let pluscodevivienda = datos.get('plus_code');
  let direccionpaciente = datos.get('direccion_paciente');


  let myHeaders = new Headers();

  
  const options = {

    method: metodopaciente,
    headers: myHeaders,
    body: new URLSearchParams({
      'Numid': idpaciente,
      'Tipo_id': tipopaciente,
      'Nombre_paciente':nombrepaciente,
      'Nombre_doctor':nombredoctor,
      'Roomie':roomies,
      'Edad':edad,
      'Nombre_ciudad':ciudad,
      'Geolocalizacion':pluscodevivienda,
      'Direccion':direccionpaciente,
      'Nom_barrio':barrio

    }),
  }


  fetch(opcionbotonpaciente, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});





const tabla = document.getElementById('lista-pacientes');

function mostrarpacientes()
{ 


  fetch('/basedatos/mostrarpacientes')
  .then((res) => res.json())
  .then((data) => { 

    $("#lista-pacientes").find("tr:gt(0)").remove();

    data.forEach(element => {

      const row = document.createElement('tr');
      row.innerHTML += `<td id ="filapacientes"> ${element.identificación} </td>
                        <td id ="filapacientes"> ${element.tipo} </td>
                        <td id ="filapacientes"> ${element.nombre_paciente} </td>
                        <td id ="filapacientes"> ${element.edad} </td>
                        <td id ="filapacientes"> ${element.fecha}</td>
                        <td id ="filapacientes"> ${element.hora} </td>
                        <td id ="filapacientes"> ${element.doctor} </td>
                        <td id ="filapacientes"> ${element.roomie} </td>
                        <td id ="filapacientes"> ${element.posición} </td>
                        <td id ="filapacientes"> ${element.direccion} </td>
                        <td id ="filapacientes"> ${element.barrio} </td>
                        <td id ="filapacientes"> ${element.ciudad} </td>
                        
                        `;

      
      tabla.appendChild(row);





    });

    document.getElementById('ventanapacientes').showModal();

    console.log(tabla);    

    
  });

  console.log('pulsando');

}

function cerrarpacientes()
{


document.getElementById('ventanapacientes').close();
/*document.getElementById('filapacientes').remove();*/ 

}

const tablabuscarpacienteespecifico = document.getElementById('lista-pacientesespecifico');

buscarpaciente[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(buscarpaciente[0]);

  let idcita = datos.get('id_buscar_paciente');
  let tipo = datos.get('tipo_paciente');


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id': idcita,
      'tipo': tipo
    }),
  }

  
  fetch('/basedatos/mostrarpacienteespecifico', options)
    .then((res) => res.json())
    .then((data) => {

      $("#lista-pacientesespecifico").find("tr:gt(0)").remove();

      console.log(data);
      data.forEach(element => {

        
        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.identificación} </td>
                          <td id ="filapacientes"> ${element.tipo} </td>
                          <td id ="filapacientes"> ${element.nombre_paciente} </td>
                          <td id ="filapacientes"> ${element.edad} </td>
                          <td id ="filapacientes"> ${element.fecha} </td>
                          <td id ="filapacientes"> ${element.hora} </td>
                          <td id ="filapacientes"> ${element.doctor} </td>
                          <td id ="filapacientes"> ${element.roomie} </td>
                          <td id ="filapacientes"> ${element.posición} </td>
                          <td id ="filapacientes"> ${element.direccion} </td>
                          <td id ="filapacientes"> ${element.barrio} </td>
                          <td id ="filapacientes"> ${element.ciudad} </td>
  
                          `;
  
        
        tablabuscarpacienteespecifico.appendChild(row);
  
      });
  
      document.getElementById('ventanapacientesespecifico').showModal();
  
      console.log(data);
      console.log(tablabuscarpacienteespecifico);

    });

});

function cerrarpacientesespecifico()
{


document.getElementById('ventanapacientesespecifico').close();
/*document.getElementById('filapacientes').remove();*/ 

}

//////////////////////////////////////////////////////////////////////////////


citas[0].addEventListener('submit', function (e) {

  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(citas[0]);

  let idpaciente = datos.get('identificacion_pacientes_citas');
  let idtipopaciente = datos.get('tipo_paciente_citas');
  let nomdoctor = datos.get('doctor_citas');
  let peso = datos.get('peso');
  let temperatura = datos.get('temperatura');
  let pas = datos.get('pas');
  let pad = datos.get('pad');
  let medicamentos = datos.get('medicamento_en_cita');
  let dosis = datos.get('dosis_en_cita');
  let observaciones = datos.get('observaciones_del_doctor');
  let estadocovid = datos.get('covid');



  let myHeaders = new Headers();

  
  const options = {

    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({

      'Numid': idpaciente,
      'tipoid':idtipopaciente,
      'temperatura': temperatura,
      'peso':peso,
      'pas':pas,
      'pad':pad,
      'positivo':estadocovid,
      'dosis':dosis,
      'observaciones':observaciones,
      'medicamento':medicamentos,
      'nomdoc':nomdoctor
      
    }),
  }


  fetch('/basedatos/insertarestadopaciente', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

const tablabuscarcitas = document.getElementById('lista-buscacitas');

buscarcita[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(buscarcita[0]);

  let idcita = datos.get('id_buscar_visita');


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id': idcita,
    }),
  }

  fetch('/basedatos/mostrarestadopaciente', options)
    .then((res) => res.json())
    .then((data) => {

      $("#lista-buscacitas").find("tr:gt(0)").remove();

      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.visitanum} </td>
                          <td id ="filapacientes"> ${element.nombre} </td>
                          <td id ="filapacientes"> ${element.identificacion} </td>
                          <td id ="filapacientes"> ${element.tipo} </td>
                          <td id ="filapacientes"> ${element.peso}</td>
                          <td id ="filapacientes"> ${element.pas} </td>
                          <td id ="filapacientes"> ${element.pad} </td>
                          <td id ="filapacientes"> ${element.temperatura} </td>
                          <td id ="filapacientes"> ${element.positivo} </td>
                          <td id ="filapacientes"> ${element.fecha} </td>
                          <td id ="filapacientes"> ${element.hora} </td>
                          <td id ="filapacientes"> ${element.nombredeldoctor} </td>
                          <td id ="filapacientes"> ${element.medicamento} </td>
                          <td id ="filapacientes"> ${element.dosis} </td>
                          <td id ="filapacientes"> ${element.observaciones} </td>
                          `;
  
        
        tablabuscarcitas.appendChild(row);
  
  
      });
  
      document.getElementById('ventanabuscacitas').showModal();
  
      console.log(data)
      console.log(tablabuscarcitas);

      
    });

});

function cerrarbuscarcitas()
{


document.getElementById('ventanabuscacitas').close();
/*document.getElementById('filapacientes').remove();*/ 

}







//////////////////////////////////////////////////////////////////////////////////////////////


var opcionbotondoctores = '';
var metododoctor = '';

function registrardoctor(){

  opcionbotondoctores = '/basedatos/insertardoctor';
  metododoctor = 'PUT';
  console.log('insertar');
  console.log(opcionbotondoctores);
  console.log(metododoctor);

}

function actualizardoctor(){

  opcionbotondoctores = '/basedatos/actualizardoctor';
  metododoctor = 'POST';
  console.log('actualizar');
  console.log(opcionbotondoctores);
  console.log(metododoctor);
}


doctores[0].addEventListener('submit', function (e) {

  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(doctores[0]);

  let iddoctor = datos.get('identeificacion_registro_doctor');
  let idtipodoctor = datos.get('tipo_doctor');
  let nombredoctor = datos.get('nombre_doctor_registro');
  let direcciondoctor = datos.get('direccion_doctor');
  let barrio = datos.get('barrios');
  let universidad = datos.get('Universidades');
  let entidad = datos.get('Entidad');
  let registrador = datos.get('nombre_registrador');

  let myHeaders = new Headers();

  
  const options = {

    method: metododoctor,
    headers: myHeaders,
    body: new URLSearchParams({
      'Numid': iddoctor,
      'Tipo_id': idtipodoctor,
      'Nombre_doctor':nombredoctor,
      'Direccion':direcciondoctor,
      'Nom_barrio':barrio,
      'Universidad':universidad,
      'Entidad':entidad,
      'Registrador':registrador

    }),
  }


  fetch(opcionbotondoctores, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});


const tabladoctoresespecifico = document.getElementById('lista-doctoresespecifico');

buscardoctor[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  console.log(buscardoctor[0]);

  let datos = new FormData(buscardoctor[0]);

  let iddoctorespecifico = datos.get('id_buscar_doctor');
  let tipodoctorespecifico = datos.get('tipo_buscar_doctor');


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id': iddoctorespecifico,
      'tipo': tipodoctorespecifico,
    }),
  }

  console.log(options);
  fetch('/basedatos/mostrardoctorespecifico',options)
    .then((res) => res.json())
    .then((data) => {

      $("#lista-doctoresespecifico").find("tr:gt(0)").remove();
      
      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.identificacion} </td>
                          <td id ="filapacientes"> ${element.tipo} </td>
                          <td id ="filapacientes"> ${element.nombre} </td>
                          <td id ="filapacientes"> ${element.direccion} </td>
                          <td id ="filapacientes"> ${element.barrio}</td>
                          <td id ="filapacientes"> ${element.entidad} </td>
                          <td id ="filapacientes"> ${element.universidad} </td>
                          `;
  
        
        tabladoctoresespecifico.appendChild(row);
  
  
      });
  
      document.getElementById('ventanadoctoresespecifico').showModal();
  
      console.log(data)
      console.log(tabladoctoresespecifico);


    });

});

function cerrardoctoresespecifico()
{


document.getElementById('ventanadoctoresespecifico').close();
/*document.getElementById('filapacientes').remove();*/ 

}


const tabladoctores = document.getElementById('lista-doctores');

function mostrardoctores()
{ 

  

  fetch('/basedatos/mostrardoctores')
  .then((res) => res.json())
  .then((data) => { 


    data.forEach(element => {

      const row = document.createElement('tr');
      row.innerHTML += `<td id ="filapacientes"> ${element.identificacion} </td>
                        <td id ="filapacientes"> ${element.tipo} </td>
                        <td id ="filapacientes"> ${element.nombre} </td>
                        <td id ="filapacientes"> ${element.direccion} </td>
                        <td id ="filapacientes"> ${element.barrio}</td>
                        <td id ="filapacientes"> ${element.entidad} </td>
                        <td id ="filapacientes"> ${element.universidad} </td>
                        `;

      
      tabladoctores.appendChild(row);





    });

    document.getElementById('ventanadoctores').showModal();

    console.log(data)
    console.log(tabladoctores);    

    
  });

  console.log('pulsando');

}

function cerrardoctores()
{


document.getElementById('ventanadoctores').close();
$("#lista-doctores").find("tr:gt(0)").remove();
/*document.getElementById('filapacientes').remove();*/ 

}




/////////////////////////////////////////////////////////////////////////
/*laboratorio[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(laboratorio[0]);
  let idlaboratorio = datos.get('identificacion_laboratorio');
  let nombrelaboratorio = datos.get('nombre_laboratorio');

  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id_lab': idlaboratorio,
      'nom_lab': nombrelaboratorio
    }),
  }

  fetch('/basedatos/insertarlaboratorio', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var opcionbotonlaboratorio = '';
var metodolaboratorio = '';

function insertarmedicamento(){

  opcionbotonlaboratorio = '/basedatos/insertarinventario';
  metodolaboratorio = 'PUT';
  console.log('insertar');
  console.log(opcionbotonlaboratorio);
  console.log(metodolaboratorio);

}

function actualizarmedicamento(){

  opcionbotonlaboratorio = '/basedatos/actualizarmedicamento';
  metodolaboratorio = 'POST';
  console.log('actualizar');
  console.log(opcionbotonlaboratorio);
  console.log(metodolaboratorio);
}


medicamento[0].addEventListener('submit', function (e) {

  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(medicamento[0]);

  let nombre_medicamento = datos.get('nombre_medicamento');
  let name_laboratorio = datos.get('laboratorio');
  let cantidad_medicina = datos.get('cantidad_medicina');



  let myHeaders = new Headers();

  
  const options = {

    method: metodolaboratorio,
    headers: myHeaders,
    body: new URLSearchParams({
      'nom_med': nombre_medicamento,
      'nom_lab': name_laboratorio,
      'stock': cantidad_medicina,

    }),
  }


  fetch(opcionbotonlaboratorio, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

const tablamedicamentoespecifico = document.getElementById('lista-medicamentoespecifico');

buscarmedicamento[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(buscarmedicamento[0]);

  let idmedicamento = datos.get('id_buscar_medicamento');


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id': idmedicamento,

    }),
  }

  

  fetch('/basedatos/mostrarmedespecifico', options)
    .then((res) => res.json())
    .then((data) => {

      $("#lista-medicamentoespecifico").find("tr:gt(0)").remove();
    
      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.id_medicamento} </td>
                          <td id ="filapacientes"> ${element.nombre_medicamento} </td>
  
                          `;
  
        
        tablamedicamentoespecifico.appendChild(row);
  
      });
  
      document.getElementById('ventanamedicamentoespecifico').showModal();
  
      console.log(data)
      console.log(tablaregistrador);

    });

});

function cerrarmedicamentoespecifico()
{


document.getElementById('ventanamedicamentoespecifico').close();
/*document.getElementById('filapacientes').remove();*/ 

}

const tablamedicamento = document.getElementById('lista-medicamento');

function mostrarmedicamento()
{ 


  fetch('/basedatos/mostrarmedicamento')
  .then((res) => res.json())
  .then((data) => { 

    $("#lista-medicamento").find("tr:gt(0)").remove();

    data.forEach(element => {

      const row = document.createElement('tr');
      row.innerHTML += `<td id ="filapacientes"> ${element.id_medicamento} </td>
                        <td id ="filapacientes"> ${element.nombre_medicamento} </td>

                        `;

      
      tablamedicamento.appendChild(row);

    });

    document.getElementById('ventanamedicamento').showModal();

    console.log(data)
    console.log(tablamedicamento);    

    
  });

  console.log('pulsando');

}

function cerrarmedicamento()
{


document.getElementById('ventanamedicamento').close();
/*document.getElementById('filapacientes').remove();*/ 

}

//////////////////////////////////////////////////////////////////////////////////////

registrador[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(registrador[0]);
  let idregistrador = datos.get('identificacion_insertar_registrador');
  let nombreregistrador = datos.get('nombre_registrador_insertar');

  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id_reg': idregistrador,
      'nom_reg': nombreregistrador
    }),
  }

  fetch('/basedatos/insertarregistrador', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

const tablaregistradorespecifico = document.getElementById('lista-registradorespecifico');

buscarregistrador[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(buscarregistrador[0]);

  let idregistradorbuscar = datos.get('id_buscar_registrador');


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id': idregistradorbuscar,

    }),
  }

  fetch('/basedatos/mostrarregespecifico', options)
    .then((res) => res.json())
    .then((data) => {

      $("#lista-registradorespecifico").find("tr:gt(0)").remove();

      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.id_registrador} </td>
                          <td id ="filapacientes"> ${element.registrador} </td>
  
                          `;
  
        
        tablaregistradorespecifico.appendChild(row);
  
      });
      
      document.getElementById('ventanaregistradorespecifico').showModal();

      console.log(data)
      console.log(tablaregistradorespecifico);   

      

    });

});

function cerrarregistradorespecifico()
{


document.getElementById('ventanaregistradorespecifico').close();
/*document.getElementById('filapacientes').remove();*/ 

}


const tablaregistrador = document.getElementById('lista-registrador');

function mostrarregistradores()
{ 


  fetch('/basedatos/mostrarregistrador')
  .then((res) => res.json())
  .then((data) => { 

    $("#lista-registrador").find("tr:gt(0)").remove();

    data.forEach(element => {

      const row = document.createElement('tr');
      row.innerHTML += `<td id ="filapacientes"> ${element.id_registrador} </td>
                        <td id ="filapacientes"> ${element.registrador} </td>

                        `;

      
      tablaregistrador.appendChild(row);

    });

    document.getElementById('ventanaregistrador').showModal();

    console.log(data)
    console.log(tablaregistrador);    

    
  });

  console.log('pulsando');

}

function cerrarregistrador()
{


document.getElementById('ventanaregistrador').close();
/*document.getElementById('filapacientes').remove();*/ 

}


///////////////////////////////////////HITORIAL CITAS ////////////////////////////////////////////
const tablahistorialbuscarcitas = document.getElementById('lista-historialbuscacitas');

buscarhistorial[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(buscarhistorial[0]);

  let idpacientehistorial = datos.get('id_buscar_citas_paciente');
  let tipohistorial = datos.get('tipo_buscar_citas_paciente');


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id': idpacientehistorial,
      'tipo':tipohistorial

    }),
  }

  fetch('/basedatos/mostrarestadopacienteesp', options)
    .then((res) => res.json())
    .then((data) => {

      $("#lista-historialbuscacitas").find("tr:gt(0)").remove();
      
      
      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.visitanum} </td>
                          <td id ="filapacientes"> ${element.nombre} </td>
                          <td id ="filapacientes"> ${element.identificacion} </td>
                          <td id ="filapacientes"> ${element.tipo} </td>
                          <td id ="filapacientes"> ${element.peso}</td>
                          <td id ="filapacientes"> ${element.pas} </td>
                          <td id ="filapacientes"> ${element.pad} </td>
                          <td id ="filapacientes"> ${element.temperatura} </td>
                          <td id ="filapacientes"> ${element.positivo} </td>
                          <td id ="filapacientes"> ${element.fecha} </td>
                          <td id ="filapacientes"> ${element.hora} </td>
                          <td id ="filapacientes"> ${element.nombredeldoctor} </td>
                          <td id ="filapacientes"> ${element.medicamento} </td>
                          <td id ="filapacientes"> ${element.dosis} </td>
                          <td id ="filapacientes"> ${element.observaciones} </td>
                          `;
  
        
        tablahistorialbuscarcitas.appendChild(row);
  
  
      });
  
      document.getElementById('ventanahistorialbuscacitas').showModal();
  
      console.log(data)
      console.log(tablahistorialbuscarcitas);



    });

});

function cerrarhistorialbuscarcitas()
{


document.getElementById('ventanahistorialbuscacitas').close();
/*document.getElementById('filapacientes').remove();*/ 

}

////////////////////////////////////////////INVENTRARIO/////////////////////////////////////////
const tablainventario = document.getElementById('lista-inventario');

buscarinventario[0].addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(buscarinventario[0]);

  let nombremedicamentoinvetario = datos.get('nombre_medicamento_historial');
  let labhistorial = datos.get('laboratorio_historial');


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'nom_med': nombremedicamentoinvetario,
      'nom_lab':labhistorial

    }),
  }

  fetch('/basedatos/mostrarinvespec', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      $("#lista-inventario").find("tr:gt(0)").remove();

      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.medicamento} </td>
                          <td id ="filapacientes"> ${element.laboratorio} </td>
                          <td id ="filapacientes"> ${element.cantidad} </td>
                          
                          `;
  
        
        tablainventario.appendChild(row);
  
      });
      
      document.getElementById('ventanainventario').showModal();

      console.log(data)
      console.log(tablainventario);  
      
      
    });

});

function cerrarinventario()
{


document.getElementById('ventanainventario').close();
/*document.getElementById('filapacientes').remove();*/ 

}

////////////////////////////////////////INFORME BARRIOS//////////////////////////////////////////


const tablainformebarrios = document.getElementById('lista-informebarrios');

informebarrios[0].addEventListener('submit', function (e) {

  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(informebarrios[0]);

  let barriosinforme = datos.get('barrios_del_informe');
  


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'nom_barrio': barriosinforme,

    }),
  }

  

  fetch('/basedatos/mostrarInformeBar', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      $("#lista-informebarrios").find("tr:gt(0)").remove();

      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.id_b} </td>
                          <td id ="filapacientes"> ${element.nombre_barrio} </td>
                          <td id ="filapacientes"> ${element.edad_promedio} </td>
                          <td id ="filapacientes"> ${element.num_contagiados} </td>
                          
                          `;
  
        
                          tablainformebarrios.appendChild(row);
  
      });
      
      document.getElementById('ventanainformebarrios').showModal();

      console.log(data)
      console.log(tablainformebarrios);  
      
      
    });

});

function cerrarinformebarrios()
{


document.getElementById('ventanainformebarrios').close();
/*document.getElementById('filapacientes').remove();*/ 

}


////////////////////////////////////////TELEFONO ACOMPAÑANTE//////////////////////////////////////////


const tablatelefonoacompañante = document.getElementById('lista-telefonosacompañantes');

buscartelefonos[0].addEventListener('submit', function (e) {

  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(buscartelefonos[0]);

  let idtelefonoacompañante = datos.get('id_telefono_acompañante');
  let tipo_telefono_acompañante = datos.get('tipo_telefono_acompañante');
  


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id_pac': idtelefonoacompañante,
      'tipo_pac': tipo_telefono_acompañante

    }),
  }

  fetch('/basedatos/mostrarAcompanantesTelefono', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      $("#lista-telefonosacompañantes").find("tr:gt(0)").remove();

      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.paciente} </td>
                          <td id ="filapacientes"> ${element.idpaciente} </td>
                          <td id ="filapacientes"> ${element.tipopaciente} </td>
                          <td id ="filapacientes"> ${element.nombreacomp} </td>
                          <td id ="filapacientes"> ${element.idacom} </td>
                          <td id ="filapacientes"> ${element.telefono} </td>
                          <td id ="filapacientes"> ${element.parentesco} </td>
                          
                          `;
  
                          tablatelefonoacompañante.appendChild(row);
  
      });
      
      document.getElementById('ventanatelefonos').showModal();

      console.log(data)
      console.log(tablatelefonoacompañante);  
      
      
    });

});

function cerrartelefonos()
{


document.getElementById('ventanatelefonos').close();
/*document.getElementById('filapacientes').remove();*/ 

}


///////////////////////////////////////////INFORME DOCTOR////////////////////////////////////////////

const tablainformedoctor = document.getElementById('lista-informedoctor');

informedoctor[0].addEventListener('submit', function (e) {

  e.preventDefault();
  console.log('me diste un click');
  let datos = new FormData(informedoctor[0]);

  let nombredoctorinforme = datos.get('nombre_doctor_informe');
  let doctoropcion = datos.get('opciones_informe_doctor');
  


  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'nom_doctor': nombredoctorinforme,
      'opcion': doctoropcion

    }),
  }

  fetch('/basedatos/mostrarInformeDoc', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      $("#lista-informedoctor").find("tr:gt(0)").remove();

      data.forEach(element => {

        const row = document.createElement('tr');
        row.innerHTML += `<td id ="filapacientes"> ${element.mes} </td>
                          <td id ="filapacientes"> ${element.semana} </td>
                          <td id ="filapacientes"> ${element.dia} </td>
                          <td id ="filapacientes"> ${element.cantidad_visitas} </td>

                          
                          `;
  
                          tablainformedoctor.appendChild(row);
  
      });
      
      document.getElementById('ventanainformedoctor').showModal();

      console.log(data)
      console.log(tablainformedoctor);  
      
      
    });

});

function cerrarinformedoctor()
{


document.getElementById('ventanainformedoctor').close();
/*document.getElementById('filapacientes').remove();*/ 

}