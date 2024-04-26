const Employee = require('../Models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const employee = new Employee({ firstName, lastName, email });
    await employee.save();
    res.status(201).json({
      status: 'success',
      message: 'Employee created successfully',
      data: {
        employee: employee,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error creating employee',
      data: {
        error: error,
      },
    });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        status: 'failed',
        message: 'Employee not found',
      });
    }
    res.json({
      status: 'success',
      message: 'Employee data fetched successfully',
      data: {
        employee: employee,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error fetching employee',
      data: {
        error: error,
      },
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({
      status: 'success',
      message: 'Employees data fetched successfully',
      data: {
        employees: employees,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error fetching employees',
      data: {
        error: error,
      },
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    // Update the employee
    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
    });

    // Fetch the updated employee
    const updatedEmployee = await Employee.findById(id);

    res.status(200).json({
      status: 'success',
      message: 'Employee updated successfully',
      data: {
        employee: updatedEmployee,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error updating employee',
      data: {
        error: error,
      },
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'Error deleting employee',
      data: {
        error: error,
      },
    });
  }
};
