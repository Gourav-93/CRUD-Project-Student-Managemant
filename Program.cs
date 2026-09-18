using Microsoft.EntityFrameworkCore;
using StudentManagementApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add Controllers
builder.Services.AddControllers();

// Add CORS policy for the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Connect MySQL Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    )
);

var app = builder.Build();

// Enable CORS
app.UseCors("AllowFrontend");

// Enable Controllers
app.MapControllers();

app.Run();