import mongosoe from 'mongoose';

const connectDatabase = async () => {
    try{
        await mongosoe.connect(process.env.MONGO_URI as string);
        console.log('Database connected!');
    }catch(error){
        console.log('Error: ', error);
        process.exit(1);
    }
}

export default connectDatabase; 