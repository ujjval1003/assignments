const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  department: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

async function manageEmployeeCollection() {
    const dbUri = "mongodb://localhost:27017/testdb";

    try {
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB.");

        const newEmployee = new Employee({
        name: "John Doe",
        age: 30,
        department: "Engineering",
        });

        const savedEmployee = await newEmployee.save();
        console.log("Inserted Employee Record:");
        console.log(savedEmployee);

        const allEmployees = await Employee.find();
        console.log("All Employee Records:");
        console.table(allEmployees.map(emp => emp.toObject()));

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    } catch (error) {
        console.error("An error occurred:", error.message);
        mongoose.disconnect();
    }
}

manageEmployeeCollection();