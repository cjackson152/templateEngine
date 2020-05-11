const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const managerProfile = require('./templates/managerProf');
const engineerProfile = require('./templates/engineerProf')
const internProfile = require('./templates/internProf')
const roster = require('./templates/rosterbuild')
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


class Employee {
    constructor() {
        this.db = {
        managers: [],
        engineers: [],
        interns: [],
        }
    }
    async createEmployee() {
        let employee = 
        await inquirer
        .prompt([
            {
                type: 'input',
                message: 'Employee Name',
                name: 'employeeName'
            },
            {
                type: 'input', 
                message: 'Employee Position',
                name: 'title'
            },
            {
                type: 'input',
                message: 'Employee Email',
                name: 'email'
            },
            {
                type: 'input',
                message: 'Assign user ID',
                name: 'employeeId'
            }
        ]);

        switch (employee.title.toLowerCase()) {
            case 'manager':
                employee = this.phone(employee);
                break;
            case 'engineer':
                employee = this.gitHubUserName(employee);
                break;
            case 'intern':
                employee = this.school(employee);
                break;
            default:
                break;
        }
        return employee;
    }
    
    async phone(employee) {
        const managerDetails = 
       await inquirer
        .prompt([
            {
                type: 'input',
                message: 'number',
                name: 'managerNumber',
            }
        ])
        employee.managerNumber = (await managerDetails).managerNumber;

        return employee;
    }

    async gitHubUserName(employee) {
        const engineerDetails = 
       await inquirer
        .prompt([
            {
                type: 'input',
                message: 'GitHub UserName',
                name: 'github'
            }
        ])
        employee.github = (await engineerDetails).github;

        return employee;
    }

    async school(employee) {
        const internDetails =
        inquirer
        .prompt([
            {
                type: 'input',
                messager: 'Intern School',
                name: 'schoolName'
            }
        ]);

        employee.school = internDetails.schoolName;
        return employee;

    }

    buildEmployee(employee) {
        let employeeInfo;
        const {employeeName, employeeId, email, title} = employee;
        switch (employee.title.toLowerCase()) {
            case 'manager':
                const manager = new Manager(employeeName, employeeId, title, email, employee.managerNumber);
                employeeInfo = manager;
                break;
            case 'engineer':
                const engineer = new Engineer(employeeName, employeeId, title, email, employee.github);
                employeeInfo = engineer;
                break;
            case 'intern':
                const intern = new Intern(employeeName, employeeId, title, email, employee.schoolName);
                employeeInfo = intern;
                break;
            default:
                break;

        }
        return employeeInfo;
    }

    saveEmployee(employeeInfo){
        switch (employeeInfo.getPosition().toLowerCase()){
            case 'manager':
                this.db.managers.push(employeeInfo);
                break;
            case 'engineer': 
                this.db.engineers.push(employeeInfo);
                break;
            case 'intern':
                this.db.interns.push(employeeInfo);
                break;
            default: 
                break;
        }
    }

    buildTeam()  {
        let managers = '';
        let engineers = '';
        let interns = '';

        if(this.db.manager) {
            managerProfile = new ManagerProfile(this.db.manager);
            managerProfile = managerProfile.buildProfile();
        }

        if(this.db.engineers) {
            for (const engineer of this.db.engineers) {
                let engeineerProfile = new EngineerProfile(engineer);
                engeineerProfile = engineerProfile.buildProfile();
                engineers += engineerProfile;
            }
        }
        if(this.db.interns) {
            for (const intern of this.db.interns) {
                let internProfile = new InternProfile(intern);
                internProfile = internProfile.buildProfile();
                engineers += internProfile;
            }
        }
        const team = managerProfile + engineers + interns;
        let roster = new roster(team);
        return roster;
    }

    buildRoster(roster) {
        fs.writeFile('./output/team.html', roster, function(err){
            if (err) throw err;
        })
    
    }

async init() {
    let input = ''
    do {
        const employeeInfo = this.buildEmployee(await this.createEmployee())
        this.saveEmployee(employeeInfo);
        input = 
        await inquirer
        .prompt([
            {
                type: 'input',
                messager: 'end programm? type exit',
                name: 'exit'

            }
        ]);

    } while (!input.exit);
    const roster = this.buildRoster();
}

}
const app = new Employee();
app.init();
