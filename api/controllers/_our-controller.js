export const helloworld = (req, res, next) => {
    console.log(res);
    res.status(200).json({
        message: "Hello world!"
    })
}
