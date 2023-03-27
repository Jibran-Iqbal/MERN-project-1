import jwt from 'jsonwebtoken'

const auth = async(req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        // if token's lenght is less than 500 it is our own else it is google-Oauth's
        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'test');
            // This will give us the data username and id
            req.userId = decodedData?.id;
        }
        else{
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
            // sub is google's name of the id that differentiates the users
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth;