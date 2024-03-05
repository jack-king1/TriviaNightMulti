export const fetchTrivia = async (amount) => {
    try {
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${amount}`
        ).then((res) => res.json());
        console.log("@NFETCHUSERS: ", response);
        return response; // Returning an array of user items
    } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Return an empty array in case of an error
    }
};
