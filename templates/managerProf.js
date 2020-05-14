// template for building manager profile
const EmployeeProfile = require('./employeeProf');
class ManagerProf extends EmployeeProfile {
    constructor(manager) {
        super(manager);
        this.phone = manager.phone;
        this.buildProfile();
    }
}
module.exports = ManagerProf