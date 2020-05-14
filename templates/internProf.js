// extension for creating intern profiles
const EmployeeProfile = require('./employeeProf');
class InternProf extends EmployeeProfile {
    constructor(intern){
        super(intern);
        this.school = intern.school;
        this.buildProfile();
    }
}
module.exports = InternProf