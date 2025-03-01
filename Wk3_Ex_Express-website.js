const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


//Serve static files from the public directory
app.use(express.static('public'));

//Generate route for html pages
app.get("/:page?", (req,res)=>{
  let page = req.params.page || "index";
  let filepath = path.join(__dirname, "views", `${page}.html`);

  res.sendFile(filepath, (err) => {
    if (err) res.status(404).send("Page Not Found");
});
})

//Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(__dirname)
});
