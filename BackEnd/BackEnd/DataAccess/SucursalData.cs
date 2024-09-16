using Dapper;
using Data;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
  public class SucursalData
  {
    private string _constring;
    public SucursalData(string constring)
    {
      _constring = constring;
    }
    public async Task<List<Sucursal>> GetSucursales(Sucursal sucursal)
    {
      List<Sucursal> list = new List<Sucursal>();
      string procedure = "getSucursal";
      var parametros = new {
        ScrCodigo = sucursal.ScrCodigo,
        ScrDescripcion=sucursal.ScrDescripcion,
        ScrDireccion=sucursal.ScrDireccion,
        ScrIdentificacion = sucursal.ScrIdentificacion,
        ScrFechaCreacion=sucursal.ScrFechaCreacion,
        ScrMndId=sucursal.ScrMndId,
      };
      var connection = new SqlConnection(_constring);
      var Result= await connection.QueryAsync(procedure, parametros, commandType: CommandType.StoredProcedure);
      foreach (var item in Result) {
        Sucursal Data= new Sucursal();
        Data.ScrCodigo = item.ScrCodigo;
        Data.ScrDescripcion = item.ScrDescripcion;
        Data.ScrDireccion = item.ScrDireccion;
        Data.ScrIdentificacion= item.ScrIdentificacion;
        Data.ScrFechaCreacion = item.ScrFechaCreacion;
        Data.ScrMndId = item.MndId;
        list.Add(Data);
      }
      return list;
    }
    public async Task<int?> InsertSucursales(Sucursal sucursal)
    {
      string procedure = "InsertSucursal";
      int? idSucursal;
      var parametros = new
      {
        ScrCodigo = sucursal.ScrCodigo,
        ScrDescripcion = sucursal.ScrDescripcion,
        ScrDireccion = sucursal.ScrDireccion,
        ScrIdentificacion = sucursal.ScrIdentificacion,
        ScrFechaCreacion = sucursal.ScrFechaCreacion,
        ScrMndId = sucursal.ScrMndId,
      };
      var connection = new SqlConnection(_constring);
      var Result = await connection.QuerySingleOrDefaultAsync(procedure, parametros, commandType: CommandType.StoredProcedure);
      if (Result != null)
      {
        idSucursal = Result.Id;
        return idSucursal;
      }
      else {
         return null;
      }
    }
    public async Task UpdateSucursales(Sucursal sucursal)
    {
      string procedure = "UpdateSucursal";
      int? idSucursal;
      var parametros = new
      {
        ScrCodigo = sucursal.ScrCodigo,
        ScrDescripcion = sucursal.ScrDescripcion,
        ScrDireccion = sucursal.ScrDireccion,
        ScrIdentificacion = sucursal.ScrIdentificacion,
        ScrFechaCreacion = sucursal.ScrFechaCreacion,
        ScrMndId = sucursal.ScrMndId,
      };
      var connection = new SqlConnection(_constring);
      await connection.QueryAsync(procedure,parametros, commandType: CommandType.StoredProcedure);

    }
  }
}
