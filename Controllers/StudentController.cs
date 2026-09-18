using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementApi.Data;
using StudentManagementApi.Models;

namespace StudentManagementApi.Controllers
{
    [ApiController]
    [Route("api/Student")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Student
        // Get all students
        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var students = await _context.Students.ToListAsync();

            return Ok(students);
        }


        // GET: api/Student/1
        // Get student by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound("Student not found");
            }

            return Ok(student);
        }


        // POST: api/Student
        // Add new student
        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student)
        {
            _context.Students.Add(student);

            await _context.SaveChangesAsync();

            return Ok(student);
        }


        // PUT: api/Student/1
        // Update student
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(
            int id,
            Student updatedStudent)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound("Student not found");
            }

            student.Name = updatedStudent.Name;
            student.Email = updatedStudent.Email;
            student.Age = updatedStudent.Age;
            student.Course = updatedStudent.Course;

            await _context.SaveChangesAsync();

            return Ok(student);
        }


        // DELETE: api/Student/1
        // Delete student
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound("Student not found");
            }

            _context.Students.Remove(student);

            await _context.SaveChangesAsync();

            return Ok("Student deleted successfully");
        }
    }
}