/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	inicio: function(req, res){
	  return res.view('homepage');
  },
  crearMateria: function(req, res){
	  return res.view('Materia/CrearMateria');
  },
  listarMaterias: function(req, res){
    Materia.find().exec(
      function(error, listadoMaterias){
        if(error){
          res.view('error',{
            error:{
              descripcion: "No se pudo cargar la lista de materias.",
              url: '/ListarMaterias'
            }
          });
        }
        res.view('Materia/ListarMaterias', {
          materias: listadoMaterias
        });
      }
    )
  },
  editarMateria: function(req, res){
    var parametros = req.allParams()
    if(parametros.id){
      Materia.findOne({
        id: parametros.id
      }).exec(function(error, MateriaEncontrada){
        if(error){
          return res.view('error',{
            error:{
              descripcion: "Error al leer materia",
              rawError: error,
              url: "/ListarMaterias"
            }
          });
        }
        if(MateriaEncontrada){
          return res.view("Materia/EditarMateria", {
            MateriaAntigua: MateriaEncontrada
          })
        }
        else{
          return res.view('error', {
            error: {
              descripcion: "La materia con el ID \""+parametros.id+" no fue encontrada.",
              rawError: "No existe la Materia",
              url: "/ListarMaterias"
            }
          });
        }
      })
    }
    else{
      return res.view('error', {
        error: {
          descripcion: "No se ha especificado el ID",
          rawError: "No se ingresó el parametro necesitado",
          url: "/ListarMaterias"
        }
      });
    }
  },

  crearGrupo: function(req, res){
    return res.view('Grupo/CrearGrupo');
  },
  listarGrupos: function(req, res){
    Grupo.find().exec(
      function(error, listadoGrupos){
        if(error){
          res.view('error',{
            error:{
              descripcion: "No se pudo cargar la lista de grupos.",
              url: '/ListarGrupos'
            }
          });
        }
        res.view('Grupo/ListarGrupos', {
          grupos: listadoGrupos
        });
      }
    )
  },
  editarGrupo: function(req, res){
    var parametros = req.allParams()
    if(parametros.id){
      Grupo.findOne({
        id: parametros.id
      }).exec(function(error, GrupoEncontrado){
        if(error){
          return res.view('error',{
            error:{
              descripcion: "Error al leer grupo",
              rawError: error,
              url: "/ListarGrupos"
            }
          });
        }
        if(GrupoEncontrado){
          return res.view("Grupo/EditarGrupo", {
            GrupoAntiguo: GrupoEncontrado
          })
        }
        else{
          return res.view('error', {
            error: {
              descripcion: "El grupo con el ID \""+parametros.id+" no fue encontrado.",
              rawError: "No existe el grupo",
              url: "/ListarGrupos"
            }
          });
        }
      })
    }
    else{
      return res.view('error', {
        error: {
          descripcion: "No se ha especificado el ID",
          rawError: "No se ingresó el parametro necesitado",
          url: "/ListarGrupos"
        }
      });
    }
  },


  error: function(req, res){
    return res.view('error', {
      error: {
        descripción: "¡Encontraste una página de error! ¡Bien por ti!",
        rawError: "Página de error",
        url: "homepage"
      }
    });
  }
};

