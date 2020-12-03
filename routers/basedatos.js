const { Pool } = require('pg');
const Router = require('express-promise-router');
const keys = require('../config/keys');


const pool = new Pool({
  connectionString: keys.posgresqlURI,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;


router.put('/insertarpaciente', async (req, res) => {
  const { Numid, Tipo_id, Nombre_paciente, Nombre_doctor, Roomie, Edad, Nombre_ciudad, Geolocalizacion,Direccion,Nom_barrio } = req.body;
  console.log(req.body)
  await pool.query(
    `SELECT insertarpaciente(${Numid},'${Tipo_id}','${Nombre_paciente}','${Nombre_doctor}',${Roomie},${Edad},'${Nombre_ciudad}','${Geolocalizacion}','${Direccion}','${Nom_barrio}')`
  );
  res.json({ 'RES': 'Paciente insertado en la base de datos' });
});

router.post('/actualizarpaciente', async (req, res) => {
  const { Numid, Tipo_id, Nombre_paciente, Nombre_doctor, Roomie, Edad, Nombre_ciudad, Geolocalizacion,Direccion, Nom_barrio} = req.body;
  console.log(req.body)
  await pool.query(
    `SELECT actualizarpaciente(${Numid},'${Tipo_id}','${Nombre_paciente}','${Nombre_doctor}',${Roomie},${Edad},'${Nombre_ciudad}','${Geolocalizacion}','${Direccion}','${Nom_barrio}')`
  );
  res.json({ 'RES': 'El paciente ha sido actualizado en la base de datos' });
});

router.get('/mostrarpacientes', async (req,res) => {
  const { rows } = await pool.query(`SELECT DISTINCT PC.id_paciente as Identificación,PC.tipo_paciente as Tipo,PC.nombre as Nombre_Paciente, LL.fecha 
  as Fecha,LL.hora as Hora,DOC.nombre as Doctor,PC.roomie as Roomie,PC.edad as Edad,CI.ciudad as Ciudad,PC.geolocalizacion 
  as Posición,PC.direccion as Direccion,BR.barrio as Barrio FROM paciente PC,llegada LL,doctor DOC,ciudad CI,barrio BR
  WHERE PC.id_paciente IN (SELECT id_paciente from paciente) AND PC.tipo_paciente IN (SELECT tipo_paciente from paciente) AND PC.id_llegada=LL.id_llegada AND PC.id_doctor=DOC.id_doctor 
  AND PC.id_ciudad=CI.id_ciudad AND PC.id_barrio=BR.id_barrio;`);
  res.json(rows);
});

router.put('/mostrarpacienteespecifico', async (req,res) => {
  const {id,tipo} = req.body;
  console.log(req.body)
  const { rows } = await pool.query(`SELECT DISTINCT PC.id_paciente as Identificación,PC.tipo_paciente as Tipo,PC.nombre as Nombre_Paciente, LL.fecha 
  as Fecha,LL.hora as Hora,DOC.nombre as Doctor,PC.roomie as Roomie,PC.edad as Edad,CI.ciudad as Ciudad,PC.geolocalizacion 
  as Posición,PC.direccion as Direccion,BR.barrio as Barrio FROM paciente PC,llegada LL,doctor DOC,ciudad CI,barrio BR
  WHERE PC.id_paciente=${id} AND PC.tipo_paciente='${tipo}' AND PC.id_llegada=LL.id_llegada AND PC.id_doctor=DOC.id_doctor 
  AND PC.id_ciudad=CI.id_ciudad AND PC.id_barrio=BR.id_barrio;`
  );
  res.json(rows);
});

router.put('/insertardoctor', async (req, res) => {
  const { Numid, Tipo_id, Nombre_doctor, Direccion, Nom_barrio, Universidad, Entidad, Registrador} = req.body;
  console.log(req.body)
  await pool.query(
    `SELECT insertardoctor(${Numid},'${Tipo_id}','${Nombre_doctor}','${Direccion}','${Nom_barrio}','${Universidad}','${Entidad}','${Registrador}')`
  );
  res.json({ 'RES': 'Doctor insertado en la base de datos' });
});

router.post('/actualizardoctor', async (req, res) => {
  const { Numid, Tipo_id, Nombre_doctor, Direccion, Nom_barrio, Universidad, Entidad, Registrador} = req.body;
  console.log(req.body)
  await pool.query(
    `SELECT actualizardoctor(${Numid},'${Tipo_id}','${Nombre_doctor}','${Direccion}','${Nom_barrio}','${Universidad}','${Entidad}','${Registrador}')`
  );
  res.json({ 'RES': 'El doctor ha sido actualizado en la base de datos' });
});

router.get('/mostrardoctores', async (req,res) => {
  const { rows } = await pool.query(`SELECT DISTINCT DOC.id_doctor as identificacion,DOC.id_tipo_doctor as Tipo,DOC.nombre as Nombre,DOC.direccion as Direccion,BR.barrio as Barrio,UV.universidad as Universidad,EN.entidad as Entidad
  FROM doctor DOC,barrio BR,universidad UV,entidad EN
  WHERE DOC.id_doctor IN (SELECT id_doctor FROM doctor) AND DOC.id_tipo_doctor IN (SELECT id_tipo_doctor FROM doctor)
    AND DOC.id_barrio=BR.id_barrio AND DOC.id_universidad=UV.id_universidad AND DOC.id_entidad=EN.id_entidad`);
  res.json(rows);
});

router.put('/mostrardoctorespecifico', async (req,res) => {
  const {id,tipo} = req.body;
  console.log(req.body)
  const { rows } = await pool.query(`SELECT DISTINCT DOC.id_doctor as identificacion,DOC.id_tipo_doctor as Tipo,DOC.nombre as Nombre,DOC.direccion as Direccion,BR.barrio as Barrio,UV.universidad as Universidad,EN.entidad as Entidad
  FROM doctor DOC,barrio BR,universidad UV,entidad EN
  WHERE DOC.id_doctor=${id} AND DOC.id_tipo_doctor='${tipo}'
    AND DOC.id_barrio=BR.id_barrio AND DOC.id_universidad=UV.id_universidad AND DOC.id_entidad=EN.id_entidad`);
  res.json(rows);
});


router.put('/insertarlaboratorio', async (req, res) => {
  const { id_lab, nom_lab } = req.body;
  console.log(req.body)
  await pool.query(
    `SELECT insertarLab(${id_lab},'${nom_lab}')`
  );
  res.json({ 'RES': 'Laboratorio insertado en la base de datos' });
});

router.put('/insertarinventario', async (req, res) => {
  const { nom_med, nom_lab,stock } = req.body;
  console.log(req.body)
  await pool.query(
    `SELECT insertarInv('${nom_med}','${nom_lab}',${stock})`
  );
  res.json({ 'RES': 'Inventario insertado en la base de datos' });
});


router.put('/insertarinforme', async(req, res) => {
  const {nom_barrio} = req.body; 
  console.log(req.body)
  await pool.query(
     `SELECT insertarInforme('${nom_barrio}')`
  );
  res.json({'RES' : 'Informe del barrio insertado en la base de datos'}); 
});

router.put('/insertarmedicamento', async(req, res) => {
  const {id_medicamento, nom_medic, nom_lab, stock} = req.body; 
  console.log(req.body)
  await pool.query(
    `SELECT insertarmedicamento(${id_medicamento}, '${nom_medic}', 
    '${nom_lab}', ${stock})`
  );
  res.json({'RES' : 'Medicamento correctamente ingresado en la base de datos'}); 
});

router.post('/actualizarmedicamento', async(req, res) => {
  const{nom_med, nom_lab, stock} = req.body; 
  console.log(req.body)
  await pool.query(
    `SELECT actualizarmedicamentos('${nom_med}', '${nom_lab}', ${stock})`
  ); 
  res.json({'RES' : 'El medicamento ha sido actualizado en el inventario de la base de datos'}); 
});

router.get('/mostrarmedicamento', async(req, res) => {
  const {rows} = await pool.query('SELECT * FROM medicamento'); 
  res.json(rows); 
}); 

router.put('/mostrarmedespecifico', async(req, res) => {
  const {id} = req.body; 
  console.log(req.body)
  const {rows} = await pool.query(`SELECT * FROM medicamento WHERE id_medicamento = ${id}`); 
  res.json(rows); 
});

router.put('/insertarregistrador', async(req, res) => {
  const {id_reg, nom_reg} = req.body; 
  console.log(req.body)
  await pool.query(
    `SELECT insertarregistrador(${id_reg}, '${nom_reg}')`
  ); 
  res.json({'RES': 'El registrador fue ingresado correctamente'}); 
}); 

router.get('/mostrarregistrador', async(req, res) => {
  const {rows} = await pool.query(`SELECT * FROM registrador`); 
  res.json(rows); 
}); 

router.put('/mostrarregespecifico', async(req, res) => {
  const {id} = req.body; 
  console.log(req.body)
  const {rows} = await pool.query(`SELECT * FROM registrador WHERE id_registrador  = ${id}`); 
  res.json(rows); 
});

router.put('/insertaracompanante', async (req, res) => {
  const { Numid, Nombre_acompañante, Correo, Telefono, Nombre_paciente, Parentesco} = req.body;
  console.log(req.body)
  await pool.query(
    `SELECT insertaracompañante(${Numid},'${Nombre_acompañante}','${Correo}','${Telefono}','${Nombre_paciente}','${Parentesco}')`
  );
  res.json({ 'RES': 'Acompañante insertado en la base de datos' });
});

router.get('/mostrarlab', async(req, res) => {
  const {rows} = await pool.query(`SELECT * FROM laboratorio`); 
  res.json(rows); 
}); 

router.get('/mostrarlabespec', async(req, res) => {
  const {id} = req.body; 
  console.log(req.body)
  const {rows} = await pool.query(`SELECT * FROM laboratorio WHERE id_laboratorio = ${id}`); 
  res.json(rows); 
});

router.put('/insertarestadopaciente', async (req, res) => {
  const { Numid, tipoid,temperatura, peso, pas, pad, positivo,dosis,observaciones,medicamento,nomdoc} = req.body;
  console.log(req.body)
  await pool.query(
    `SELECT insertarestadopacientes(${Numid},'${tipoid}',${temperatura},${peso},${pas},${pad},${positivo},'${dosis}','${observaciones}','${medicamento}','${nomdoc}')`
  );
  res.json({ 'RES': 'Estado paciente insertado en la base de datos' });
});


router.put('/mostrarestadopaciente', async(req, res) => {
  const {id} = req.body; 
  console.log(req.body)
  const {rows} = await pool.query(`SELECT DISTINCT EP.id_visita as VisitaNum,EP.id_paciente as identificacion,EP.tipo_paciente as tipo,PA.nombre as nombre,
  EP.temperatura_p as temperatura,EP.peso_p as Peso,EP.pas as pas,EP.pad as pad,EP.positivo as Positivo,HFV.fecha_cita Fecha, HFV.hora_cita Hora,
  R.observaciones as Observaciones,MD.nombre_medicamento as Medicamento,R.dosis as Dosis,D.nombre as NombreDelDoctor
  FROM estado_paciente EP,paciente PA,hora_fecha_visita HFV,visita_fecha VF,visita_receta VR,receta R,medicamento MD,visita_doctor VD,doctor D 
  WHERE EP.id_visita=${id} AND EP.id_paciente=PA.id_paciente AND EP.tipo_paciente=PA.tipo_paciente AND
  EP.id_visita=VF.id_visita AND VF.id_date=HFV.id_date AND EP.id_visita=VR.id_visita AND VR.id_receta=R.id_receta AND
  R.id_medicamento=MD.id_medicamento AND EP.id_visita=VD.id_visita AND VD.id_doctor=D.id_doctor AND VD.id_tipo_doctor=D.id_tipo_doctor`); 
  res.json(rows); 
});

router.put('/mostrarestadopacienteesp', async(req, res) => {
  const {id,tipo} = req.body; 
  console.log(req.body)
  const {rows} = await pool.query(`SELECT DISTINCT EP.id_visita as VisitaNum,EP.id_paciente as identificacion,EP.tipo_paciente as tipo,PA.nombre as nombre,
  EP.temperatura_p as temperatura,EP.peso_p as Peso,EP.pas as pas,EP.pad as pad,EP.positivo as Positivo,HFV.fecha_cita Fecha, HFV.hora_cita Hora,
  R.observaciones as Observaciones,MD.nombre_medicamento as Medicamento,R.dosis as Dosis,D.nombre as NombreDelDoctor
  FROM estado_paciente EP,paciente PA,hora_fecha_visita HFV,visita_fecha VF,visita_receta VR,receta R,medicamento MD,visita_doctor VD,doctor D 
  
  WHERE EP.id_paciente IN (SELECT id_paciente FROM estado_paciente) AND EP.tipo_paciente IN (SELECT tipo_paciente FROM estado_paciente)
  AND EP.id_paciente=PA.id_paciente AND EP.tipo_paciente=PA.tipo_paciente AND
  EP.id_visita=VF.id_visita AND VF.id_date=HFV.id_date AND EP.id_visita=VR.id_visita AND VR.id_receta=R.id_receta AND
  R.id_medicamento=MD.id_medicamento AND EP.id_visita=VD.id_visita AND VD.id_doctor=D.id_doctor AND VD.id_tipo_doctor=D.id_tipo_doctor AND 
  EP.id_paciente=${id} AND EP.tipo_paciente='${tipo}'`); 
  res.json(rows); 
});

router.get('/mostrarInventario', async (req, res) => {
  const {rows} = await pool.query(`SELECT DISTINCT med.nombre_medicamento AS Medicamento, lab.laboratorio AS Laboratorio, inv.stock AS Cantidad FROM medicamento med, laboratorio lab, inventario inv WHERE 
  inv.id_medicamento IN (SELECT id_medicamento FROM medicamento) AND inv.id_laboratorio = lab.id_laboratorio`); 
  res.json(rows); 
}); 

router.put('/mostrarinvespec', async (req, res) => {
  const {nom_med, nom_lab} = req.body; 
  console.log(req.body); 
  const {rows} = await pool.query(`SELECT DISTINCT med.nombre_medicamento AS Medicamento, lab.laboratorio AS Laboratorio, inv.stock AS Cantidad FROM medicamento med, laboratorio lab, inventario inv 
  WHERE med.nombre_medicamento iLike concat('%', '${nom_med}' , '%') AND  lab.laboratorio iLike concat('%', '${nom_lab}' , '%')  AND inv.id_medicamento = med.id_medicamento AND inv.id_laboratorio = lab.id_laboratorio`); 
  res.json(rows); 
});

///////////////////////////////////////////implementar estas 3 en el front end//////////////////////
// mostrarAcompanantesTelefono
router.put('/mostrarAcompanantesTelefono', async (req, res) => {
  const {id_pac, tipo_pac} = req.body; 
  console.log(req.body); 
  const {rows} = await pool.query(`SELECT pac.nombre AS Paciente, pac.id_paciente AS Idpaciente, pac.tipo_paciente AS TipoPaciente, acomp.id_acompañante AS IDAcom, acomp.nombre AS NombreAcomp, parent.parentesco AS Parentesco, tel.tel_acompañante AS Telefono
  FROM acompañante acomp, telefono_acompañante tel, paciente pac, parentesco parent WHERE 
  tel.id_acompañante = acomp.id_acompañante AND pac.id_paciente = ${id_pac} AND  parent.id_paciente = pac.id_paciente
  AND parent.id_acompañante = acomp.id_acompañante AND pac.tipo_paciente = '${tipo_pac}'`); 
  res.json(rows); 
});

router.put('/mostrarInformeBar', async(req, res) => {
  const {nom_barrio} = req.body; 
  console.log(req.body); 
  const {rows} = await pool.query(`SELECT * FROM generarInformeBar('${nom_barrio}')`); 
  res.json(rows); 
}); 

// mostrarInformeDoc
router.put('/mostrarInformeDoc', async(req, res) => {
  const {nom_doctor, opcion} = req.body; 
  console.log(req.body);
  const {rows} = await pool.query(`SELECT * FROM generarInformeDoc('${nom_doctor}', '${opcion}')`); 
  res.json(rows);
});