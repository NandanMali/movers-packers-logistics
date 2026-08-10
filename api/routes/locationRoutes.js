// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();

// router.get("/search", async (req, res) => {
//     try {
//         const query = req.query.q;

//         if (!query) {
//             return res.json([]);
//         }

//         const response = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
//             {
//                 headers: {
//                     "User-Agent": "MoversPackers/1.0 (contact@example.com)"
//                 }
//             }
//         );

//         const data = await response.json();

//         res.json(data);

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             message: err.message
//         });
//     }
// });

// export default router;










import express from "express";

const router = express.Router();

router.get("/search", async (req, res) => {
    try {

        const query = req.query.q;

        if (!query) {
            return res.json([]);
        }

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
            {
                headers: {
                    "User-Agent": "MoversPackers/1.0"
                }
            }
        );

        if (!response.ok) {
            return res.status(response.status).json({
                message: "Location service error"
            });
        }

        const data = await response.json();

        res.json(data);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }
});

export default router;