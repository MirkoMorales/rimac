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
  'url' : 'url'
 };

 const valueTranslations = {
  'blond': 'rubio',
  'blonde': 'rubio',
  'none': 'ninguno',
  'black': 'negro',
  'white': 'blanco',
  'brown': 'marron',
  'blue': 'azul',
  'grey': 'gris',
  'gold': 'oro',
  'yellow' : 'amarillo',
  'fair' : 'blanca',
  'red' : 'rojo',
  'green' : 'verde',
  'silver' : 'plateado',
  'unknown': 'desconocido',
  'female': 'femenino',
  'male': 'masculino',
  'pale': 'palido',
  'light': 'ligero',
  'tan': 'bronceado'
 };

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

fetchAllPeople().then(people => {
  const translatedPeople = people.map(person => {
    let translatedPerson = {};
    for (let index in person) {
      let translatedIndex = fieldIndexTranslations[index] || index;
      let translatedValue;
      if (typeof person[index] === 'string') {
          let values = person[index].split(',').map(value => {
            return valueTranslations[value.trim()] || value.trim();
          });
          translatedValue = values.join(', ');
      } else {
        translatedValue = person[index];
      }
      translatedPerson[translatedIndex] = translatedValue;
    }
    return translatedPerson;
  });
  console.log(translatedPeople);
});

/*
fetchAllPeople().then(people => {
  const translatedPeople = people.map(person => {
  let translatedPerson = {};
  for (let index in person) {
      let translatedIndex = fieldIndexTranslations[index] || index;
      let translatedValue = valueTranslations[person[index]] || person[index];
      translatedPerson[translatedIndex] = translatedValue;
  }
  return translatedPerson;
  });
  console.log(translatedPeople);
});
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

exports.TraslatePerson = async (event) => {
  try {
     const people = await fetchAllPeople();
     return {
       statusCode: 200,
       headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": 'GET',
         "Content-Type": "application/json"
       },
       body: JSON.stringify(people)
     };
  } catch (error) {
     console.error(`Error al obtener personas: ${error}`);
     return {
       statusCode: 500,
       headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": 'GET',
         "Content-Type": "application/json"
       },
       body: JSON.stringify({ error: 'Error al obtener personas' })
     };
  }
 };


/*
(async () => {
  console.log('Personajes:', await getAllPeople());
  //console.log('Elementos:', await getAllItems());
  //console.log('Elemento agregado:', await addItem({name: 'Prueba'}));
})();
*/