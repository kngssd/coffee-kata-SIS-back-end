import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

//allow morgan logger to get access to each request before and after our handlers
app.use(morgan("dev"));
//auto-include CORS headers to allow consumption of our content by in-browser js loaded from elsewhere
app.use(cors());
//parse body text of requests having content-type application/json, attaching result to `req.body`
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        outcome: "success",
        message: "hello world",
    });
});

let customersList = [];

app.post("/customers", (req, res) => {
    try {
        const { name } = req.body;
        const newCustomer = {
            id: customersList.length + 1,
            name,
            stamps: 0,
            freeCoffee: 0,
        };
        customersList.push(newCustomer);

        res.json(newCustomer);
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.get("/customers", (req, res) => {
    try {
        res.json(customersList);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// app.post("/customers/:id/stamps", (req, res) => {
//     try {
//         const customerID = parseInt(req.params.id);

//     } catch (error) {
//         res.status(500).json({ error });
//     }
// });

//use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
