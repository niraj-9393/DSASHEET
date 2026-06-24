export const addToSheet = async (req, res) => {
    try {
        const { name, link, difficulty, remark } = req.body;

        if (!name || !link || !difficulty) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        console.log(req.body);

        return res.status(200).json({
            success: true,
            message: "Data received successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};