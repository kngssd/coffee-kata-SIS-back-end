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

let customersList = [
    { id: 1, name: "Ali", stamps: 3, freeCoffees: 0 },
    { id: 2, name: "Bilal", stamps: 5, freeCoffees: 0 },
    { id: 3, name: "Charlie", stamps: 0, freeCoffees: 2 },
    { id: 4, name: "Dani", stamps: 3, freeCoffees: 1 },
];

app.post("/customers", (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(500).json({ error: "Name is required" });
        }
        const newCustomer = {
            id: customersList.length + 1,
            name,
            stamps: 0,
            freeCoffees: 0,
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

app.post("/customers/:id/stamps", (req, res) => {
    try {
        const customerID = parseInt(req.params.id);
        const customer = customersList.find(
            (customer) => customer.id === customerID
        );
        customer.stamps += 1;
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error });
    }
});

//use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
