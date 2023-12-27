'use strict';
const axios = require('axios');

const fieldIndexTranslations = {
  'name': 'nombre',
  'height': 'altura',
  'mass': 'masa',
  'hair_color': 'color_pelo',
  'eye_color' : 'color_ojo',
  'skin_color' : 'color_piel',
  'birth_year' : 'anio_nacimiento',
  'gender' : 'genero',
  'homeworld' : 'planeta_nacimiento',
  'films' : 'pelicula',
  'species' : 'especie',
  'vehicles' : 'vehiculo',
  'starships' : 'nave_estelar',
  'created' : 'creado',
  'edited' : 'editado',
 };

 const valueTranslations = {
  'blond': 'rubio',
  'none': 'ninguno',
  'black': 'negro',
  'white': 'blanco',
  'brown': 'marron',
  'blue': 'azul',
  'unknown': 'desconocido',
  'female': 'femenino',
  'male': 'masculino'
 };

 const combinedTranslations = Object.assign({}, fieldIndexTranslations, valueTranslations);

 async function fetchAllPeople(url = 'https://swapi.dev/api/people/') {
 try {
 const response = await axios.get(url);
 const people = response.data.results;
 if (response.data.next) {
  return people.concat(await fetchAllPeople(response.data.next));
 } else {
  return people;
 }
 } catch (error) {
 console.error(`Error al obtener personas: ${error}`);
 }
}
/*
fetchAllPeople().then(people => {
  const translatedPeople = people.map(person => {
  let translatedPerson = {};
  for (let index in person) {
    if (valueTranslations[person[index]]) {
      translatedPerson[index] = valueTranslations[person[index]];
    } else if (fieldIndexTranslations[index]) {
      translatedPerson[fieldIndexTranslations[index]] = person[index];
    }
   //translatedPerson[fieldIndexTranslations[index]] = person[index];
  }
  return translatedPerson;
  });
  console.log(translatedPeople);
 });
*/
 fetchAllPeople().then(people => {
  const translatedPeople = people.map(person => {
  let translatedPerson = {};
  for (let index in person) {
  if (combinedTranslations[index]) {
   translatedPerson[combinedTranslations[index]] = person[index];
  } else {
   translatedPerson[index] = person[index];
  }

  if (combinedTranslations[person[index]]) {
    translatedPerson[index] = combinedTranslations[person[index]];
   } else {
    translatedPerson[index] = person[index];
   }

  }
  return translatedPerson;
  });
  console.log(translatedPeople);
 });

/*
fetchAllPeople().then(people => {
 console.log(people);
});

async function getAllPeople() {
  try {
     const response = await axios.get('https://swapi.dev/api/people/');
     return response.data.results;
  } catch (error) {
     console.error('Error al obtener los personajes:', error);
  }
 }
*/

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '¡¡¡¡¡¡Hola Serverless!!!!!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.helloUser = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hola Usuario',
        input: event,
      },
      null,
      2
    ),
  };
};

/*
(async () => {
  console.log('Personajes:', await getAllPeople());
  //console.log('Elementos:', await getAllItems());
  //console.log('Elemento agregado:', await addItem({name: 'Prueba'}));
})();
*/