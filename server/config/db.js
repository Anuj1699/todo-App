import mongoose from "mongoose"

const database = mongoose.connect("mongodb+srv://chandanuj16:L9cb033vcfshiX8A@cluster0.8sit5ur.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Connected"))
.catch((error) => console.log(error))

export default database;