import { app } from "./app"
import UserBusiness from "./business/UserBusiness"
import UserController from "./controller/UserController"
import UserData from "./data/UserData"
import JobBusiness from "./business/JobBusiness"
import JobController from "./controller/JobController"
import JobData from "./data/JobData"
import Services from "./services/Services"


const userController = new UserController(
    new UserBusiness(
        new UserData,
        new Services
    )
)

const jobController = new JobController(
    new JobBusiness(
        new JobData,
        new Services
    )
)



app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.post('/jobs', jobController.create)

app.get('/jobs', jobController.getAllJobs)
app.get('/userjobs', jobController.jobsByProvider)
app.get('/job/:id', jobController.findById)
app.get('/user', userController.findById)

app.delete('/job/:id', jobController.delJob)