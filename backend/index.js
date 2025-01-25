const express = require('express');
require("./connection");
var JobModel = require("./model/job");
const UserModel = require('./model/user');
var cors = require('cors');
const bcrypt = require('bcryptjs');
// const ApplicationModel = require('./model/application');
const multer = require("multer");
const path = require("path");
// const upload = require("./uploadMiddleware");
const bodyParser = require("body-parser");
const Application = require("./model/application");
const router = express.Router()
const mongoose = require('mongoose')

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg" ,"image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .pdf, .doc, .jpg, and .docx formats are allowed!"), false);
    }
  };
  
  const upload = multer({ storage, fileFilter });
  


// API Endpoints
// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Job Application Backend');
});

// Trial endpoint
app.get('/trial', (req, res) => {
    res.send('This is a trial message for Job App');
});

// Sign up
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user with the hashed password
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.send({ message: "User registered successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to register user" });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }

        // Compare password with hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send({ message: 'Incorrect password!' });
        }

        res.send({ message: 'Login successful!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Failed to login' });
    }
});

// Add a new job
app.post("/add", async (req, res) => {
    try {
        await JobModel(req.body).save()
        res.send({ message: "Job added successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Failed to add job" })
    }
})

// View all jobs
app.get("/view", async (req, res) => {
    try {
        var data = await JobModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Failed to retrieve jobs" })
    }      
})

// Delete a job by ID
app.delete("/remove/:id", async (req, res) => {
    try {
        await JobModel.findByIdAndDelete(req.params.id)
        res.send({ message: "Job deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Failed to delete job" })
    }
})

// Update a job by ID
app.put("/update/:id", async (req, res) => {
    try {
        await JobModel.findByIdAndUpdate(req.params.id, req.body)
        res.send({ message: "Job updated successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Failed to update job" })
    }
})


// Endpoint to submit a job application
app.post("/application", upload.single("cv"), async (req, res) => {
  try {
    const { jobId, email, linkedInUrl } = req.body;
    const cvUrl = req.file ? req.file.path : null;
    // Save application to the database
    const newApplication = new Application({
      jobId,
      email,
      linkedInUrl,
      cvUrl,
    });

    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit application." });
  }
});

// View Applied Jobs
app.get("/viewjobs", async (req, res) => {
    try {
        var data = await Application.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to retrieve jobs." });
    }
});

// fetching job details by jobId
app.get('/viewJobs/:id', async (req, res) => {
    try {
      const job = await JobModel.findById(req.params.id); // Correcting the query to just use the id parameter
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      res.json(job); // Send the job details back in the response
    } catch (error) {
      console.error("Error fetching job details:", error);
      res.status(500).json({ message: "Server error" });
    }
  })
  





//delete applied jobs
app.delete("/removeApplied/:id", async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id)
        res.send({ message: "Application deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Failed to delete Application" })
    }
})





// Port Setting
app.listen(3005, () => {
    console.log('Server is running on port 3005');
});
