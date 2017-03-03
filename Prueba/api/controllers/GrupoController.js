/**
 * GrupoController
 *
 * @description :: Server-side logic for managing Grupoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//Crear Grupo
  crearGrupo: function(req, res){

    if(req.method == 'POST') {
      var parametros = req.allParams();

      if (parametros.idMateria) {
        if(parametros.nombreGrupo) {
          Grupo.create({
              nombreGrupo: parametros.nombreGrupo,
              numeroMaximoEstudiantes: parametros.numeroMaximoEstudiantes,
              idMateria: parametros.idMateria
            }
          ).exec(function (error, nuevoGrupo) {
            if (error) return res.view('error', {
              error: {
                descripcion: 'No se pudo crear un nuevo grupo. ERROR: ' + error,
                rawError: err,
                url: "/CrearGrupo"
              }
            });
          });

          Grupo.find().exec(
            function (error, listadoGrupos) {
              if (error) {
                res.view('error', {
                  error: {
                    descripcion: "No se pudo cargar la lista de grupos.",
                    url: "/ListarGrupos"
                  }
                })
              }
              res.view('Grupo/ListarGrupos', {
                grupos: listadoGrupos
              });
            }
          )
        }
        else{
          return res.view('error', {
            title: 'Error',
            error: {
              descripcion: 'No se ingresó el nombre del grupo.',
              url: '/CrearGrupo'
            }
          })
        }
      }
      else {
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No se ingresó el id de la materia.',
            url: '/CrearGrupo'
          }
        })
      }
    }
    else{
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Método HTTP no admitido.',
          url: '/CrearGrupo'
        }
      })
    }
  },

  editarGrupo: function(req, res){
    var parametros = req.allParams();
    if(parametros.id){
      var GrupoActualizado = {
        nombreGrupo: parametros.nombreGrupo,
        numeroMaximoEstudiantes: parametros.numeroMaximoEstudiantes,
        idMateria: parametros.idMateria
      };
      Grupo.update({
        id: parametros.id
      }, GrupoActualizado).exec(
        function (error, GrupoAntiguo) {
          if (error) {
            return res.view('error', {
              error: {
                descripcion: "Error al actualizar grupo.",
                rawError: error,
                url: "/ListarGrupos"
              }
            });
          }

          Grupo.find().exec(function (error, listadoGrupos) {
            if (error) {
              res.view('error', {
                error: {
                  descripcion: "Error al cargar los grupos",
                  rawError: error,
                  url: "/ListarGrupos"
                }
              });
            }
            res.view('Grupo/ListarGrupos', {
              grupos: listadoGrupos
            });
          })
        })
    }
    else{
      return res.view('error',{
        error: {
          descripcion: "Se necesita el ID para continuar.",
          rawError: "No se envió el ID",
          url: "/ListarGrupos"
        }
      });
    }
  },

  borrarGrupo: function(req, res){
    var parametros = req.allParams();
    console.log(parametros);
    if(parametros.id){
      Grupo.destroy({
        id: parametros.id
      }).exec(function(error, GrupoBorrado){
        if(error){
          return res.view('error', {
            error: {
              descripcion: "Error al borrar el grupo.",
              rawError: error,
              url: "/ListarGrupo"
            }
          });
        }
        Grupo.find().exec(function (error, listadoGrupos) {
          if (error) {
            res.view('error', {
              error: {
                descripcion: "Error al cargar los grupos",
                rawError: error,
                url: "/ListarGrupos"
              }
            });
          }
          res.view('Grupo/ListarGrupos', {
            grupos: listadoGrupos
          });
        })
      })
    }
  }

};

