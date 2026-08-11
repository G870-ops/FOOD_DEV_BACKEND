import mongoose  from "mongoose"

  export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://inspiritualstrainge_db_user:zrzZPTChIVb0IYRK@cluster0.fqunky2.mongodb.net/Food_Delivery').then(()=>console.log("DB Connected"));
    
  }