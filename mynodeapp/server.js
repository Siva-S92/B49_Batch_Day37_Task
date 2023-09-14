const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const outputFolder = "./output" //folder name

//To check whether the folder is already there or not, if not there, create a new folder
if(!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

const PORT = 3000;

app.get('/createFile', (req, res) => {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString();
    const date = currentTime.getDate().toString();
    const hours = currentTime.getHours().toString();
    const minutes = currentTime.getMinutes().toString();
    const seconds = currentTime.getSeconds().toString();
    

    const dateTimeForFileName = `${year}-${month}-${date}-${hours}-${minutes}-${seconds}.txt`;

    const filePath = path.join(outputFolder, dateTimeForFileName);

    fs.writeFile(filePath, currentTime.toISOString(), (err) => {
        if(err) {
            res.status(500).send(`Error Occured where creating the file: ${err}`);
            return;
        }
        res.send(`File created successfully at: ${filePath}`)
    });

});

app.get('/getFiles', (req, res) => {
    fs.readdir(outputFolder, (err, files) => {
        if(err) {
            res.status(500).send(`Error Occured where reading the file: ${err}`);
            return;
        }
        console.log(`List of files: ${files}`);
        const textFiles = files.filter((file) => path.extname(file) == ".txt");
        res.json(textFiles);

    })
})

app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
})
