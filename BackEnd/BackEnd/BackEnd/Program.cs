var builder = WebApplication.CreateBuilder(args);

// Configura servicios
builder.Services.AddControllers();

builder.Services.AddCors(options => options.AddPolicy("AllowWebapp",
                                               builder => builder.AllowAnyOrigin()
                                                               .AllowAnyHeader()
                                                               .AllowAnyMethod()));

var app = builder.Build();
app.UseCors("AllowWebapp");

// Configura la canalización HTTP
if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
}

app.UseRouting();

app.UseEndpoints(endpoints =>
{
  endpoints.MapControllers();
});

app.Run();
