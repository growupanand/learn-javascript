import express from "express";

const app = express();
const port = 3000; 


app.use(express.json()); 

// API endpoint to handle chat requests
app.get('/stream', async (req, res) => {
  try {

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // flush the headers to establish SSE with client

    res.write('event: jsonData\n');
    const jsonData = JSON.stringify({
      name : "utkarsh anand"
    })
    res.write(`data: ${jsonData}\n\n`); 
    res.write('event: customMessage\n');
    res.write(`data: hello2\n\n`); 
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.get('/client', async (req, res)=>{
    res.sendFile(__dirname + '/client.html');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
