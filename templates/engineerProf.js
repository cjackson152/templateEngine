// extends for engineer profiles
const EmployeeProfile = require('./employeeProf');
class EngineerProf extends EmployeeProfile{
    constructor(engineer) {
        super(engineer);
        this.github = engineer.githubthis
        this.buildProfile();
    }
};
module.exports = EngineerProf