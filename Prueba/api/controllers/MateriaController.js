/**
 * MateriaController
 *
 * @description :: Server-side logic for managing Materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  //Crear Materia
  crearMateria: function(req, res){

    if(req.method == 'POST') {
      var parametros = req.allParams();

      if (parametros.nombreMateria) {
        Materia.create({
            nombreMateria: parametros.nombreMateria,
            topicoMateria: parametros.topicoMateria,
            fechaCreacion: new Date()
          }
        ).exec(function (error, nuevaMateria) {
          if (error) return res.view('error', {
            error: {
              descripcion: 'No se pudo crear una nueva materia. ERROR: '+error,
              rawError: err,
              url: "/crearMateria"
            }
          });
        });

        Materia.find().exec(
          function(error, listadoMaterias){
            if(error){
              res.view('error',{
                error:{
                  descripcion: "No se pudo cargar la lista de materias.",
                  url: "/listarMaterias"
                }
              })
            }
            res.view('Materia/listarMaterias', {
              materias: listadoMaterias
            });
          }
        )
      }
      else {
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No se ingresó el nombre de la materia.',
            url: '/crearMateria'
          }
        })
      }
    }
    else{
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Método HTTP no admitido.',
          url: '/crearMateria'
        }
      })
    }
  },

  editarMateria: function(req, res){
    var parametros = req.allParams();
    if(parametros.id && parametros.nombreMateria){
      var MateriaActualizada = {
        nombreMateria: parametros.nombreMateria,
        topicoMateria: parametros.topicoMateria,
        fechaCreacion: parametros.fechaCreacion
      };
      Materia.update({
        id: parametros.id
        }, MateriaActualizada).exec(
        function (error, MateriaAntigua) {
          if (error) {
            return res.view('error', {
              error: {
                descripcion: "Error al actualizar.",
                rawError: error,
                url: "/listarMaterias"
              }
            });
          }

          Materia.find().exec(function (error, listadoMaterias) {
            if (error) {
              res.view('error', {
                error: {
                  descripcion: "Error al cargar las materias",
                  rawError: error,
                  url: "/listarMaterias"
                }
              });
            }
            res.view('Materia/listarMaterias', {
              materias: listadoMaterias
            });
          })
        })
    }
    else{
      return res.view('error',{
        error: {
          descripcion: "La materia debe tener un nombre.",
          rawError: "No se ingresó un nombre",
          url: "/listarMaterias"
        }
      });
    }
  },

  borrarMateria: function(req, res){
    var parametros = req.allParams();
    if(parametros.id){
      Materia.destroy({
        id: parametros.id
      }).exec(function(error, MateriaBorrada){
        if(error){
          return res.view('error', {
            error: {
              descripcion: "Error al borrar la materia.",
              rawError: error,
              url: "/listarMaterias"
            }
          });
        }
        Materia.find().exec(function (error, listadoMaterias) {
          if (error) {
            res.view('error', {
              error: {
                descripcion: "Error al cargar las materias",
                rawError: error,
                url: "/listarMaterias"
              }
            });
          }
          res.view('Materia/listarMaterias', {
            materias: listadoMaterias
          });
        })
      })
    }
  }

};

