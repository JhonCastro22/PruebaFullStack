using Data;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
  public class SucursalManager:SucursalData
  {
    private string _constring;
    public SucursalManager(string constring):base(constring)
    {
      _constring = constring;
    }
    public async Task<List<Sucursal>> GetSucursal(Sucursal sucursal)
    {
      return await GetSucursales(sucursal);
    }
    public async Task<int?> InsertSucursal(Sucursal sucursal)
    {
      return await InsertSucursales(sucursal);
    }
    public async void UpdateSucursal(Sucursal sucursal)
    {
      await UpdateSucursales(sucursal);
    }
  }
}
