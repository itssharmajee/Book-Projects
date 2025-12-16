import mongoose from 'mongoose'

export async function DBConfig() {
    return mongoose.connect(process.env.DB_URL).then(() => {
        console.log('db connected successfully');
    }).catch((err) => {
        console.log(err);
    })
}

