using Data;
using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
  public class MonedaManager : MonedaData
  {
    private string _constring;
    public MonedaManager(string constring) : base(constring)
    {
      _constring = constring;
    }
    public async Task<List<Moneda>> GetMoneda(Moneda moneda)
    {
      return await GetMonedas(moneda);
    }
  }
}
