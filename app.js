const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const managerProfile = require('./templates/managerProf');
const engineerProfile = require('./templates/engineerProf')
const internProfile = require('./templates/internProf')
const roster = require('./templates/rosterbuild')
const inquirer = require("inquirer");
const fs = require("fs");
const http = require('http');



// create place to hold employees
class Employee {
    constructor() {
        this.db = {
        managers: [],
        engineers: [],
        interns: [],
        }
    }

// questions to build employees
    async createEmployee() {
        let employee = 
        await inquirer
        .prompt([
            {
                type: 'input',
                message: 'Employee Name',
                name: 'employeeName',
                default: 'steve'
            },
            {
                type: 'input', 
                message: 'Employee Position',
                name: 'title',
                default: 'Manager, Engineer, Intern'
            },
            {
                type: 'input',
                message: 'Employee Email',
                name: 'email',
                default: '@thissite.com'
            },
            {
                type: 'input',
                message: 'Assign user ID',
                name: 'employeeId',
                default: '5 digit max'
            }
        ]);
// cases for different employee positions
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
 //assign phone number to manager   
    async phone(employee) {
        const managerDetails = 
       await inquirer
        .prompt([
            {
                type: 'input',
                message: 'Managers phone number',
                name: 'managerNumber',
                default: '(###)-###-####'
            }
        ])
        employee.managerNumber = (await managerDetails).managerNumber;

        return employee;
    }
// assign github to engineer
    async gitHubUserName(employee) {
        const engineerDetails = 
       await inquirer
        .prompt([
            {
                type: 'input',
                message: 'GitHub UserName',
                name: 'github',
                default: 'cjackson152'
            }
        ])
        employee.github = (await engineerDetails).github;

        return employee;
    }
//assign school to intern
    async school(employee) {
        const internDetails =
        inquirer
        .prompt([
            {
                type: 'input',
                messager: 'Intern School',
                name: 'schoolName',
                default: 'UCI'
            }
        ]);

        employee.school = internDetails.schoolName;
        return employee;

    }
// expands employees
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
// save employee to db
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
// builds team
    buildTeam()  {
        let managers = '';
        let engineers = '';
        let interns = '';

        if(this.db.managers) {
            for (const manager of this.db.managers){
                let managerProfile = new ManagerProfile(manager);
                managerProfile = new ManagerProfile(this.db.manager);
                managers += managerProfile.buildProfile();
        }}

        if(this.db.engineers) {
            for (const engineer of this.db.engineers) {
                let engineerProfile = new EngineerProfile(engineer);
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
        const team = managers + engineers + interns;
        let roster = new roster(team);
        roster = roster.buildTeam();
        return roster;
    }
// outputs team to roster
    buildTeam(roster) {
        fs.writeFile('./output/team.html', roster, function(err){
            if (err) throw err;
        })
    
    }
    
// creates server to host roster
    createServer(roster) {

        fs.writeFile('./output/team.html', roster, function (err) {
            if (err) throw err;
        });


        http.createServer(function (req, res) {
            fs.readFile('./output/team.html', function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            });

        }).listen(8080);
    }
// 
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
                message: 'end programm? type exit. otherwise press enter',
                name: 'exit'

            }
        ]);

    } while (!input.exit);
    const roster = this.buildTeam();

    this.createServer(roster);
}

}
// creates ability to create new employee
const app = new Employee();
app.init();
