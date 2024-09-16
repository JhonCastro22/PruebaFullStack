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
  public class MonedaData
  {
    private string _constring;
    public MonedaData(string constring)
    {
      _constring = constring;
    }
    public async Task<List<Moneda>> GetMonedas(Moneda moneda)
    {
      List<Moneda> list = new List<Moneda>();
      string procedure = "getMoneda";
      var parametros = new
      {
        MndId=moneda.MndId,
        MndNombre=moneda.MndNombre
      };
      var connection = new SqlConnection(_constring);
      var Result = await connection.QueryAsync(procedure, parametros, commandType: CommandType.StoredProcedure);
      foreach (var item in Result)
      {
        Moneda Data = new Moneda();
        Data.MndId = item.MndId;
        Data.MndNombre = item.MndNombre;
        Data.MndEstado = item.MndEstado;
        list.Add(Data);
      }
      return list;
    }
  }
}
