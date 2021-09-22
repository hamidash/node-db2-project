// DO YOUR MAGIC
const router = require("express").Router();
const carsDb = require("./cars-model");
const carsMiddleware = require("./cars-middleware");

router.get('/', (req,res)=> {
    carsDb.getAll()
    .then(cars => {
        res.status(200).json(cars)
    })
    .catch(err => res.status(500).json({message:"Couldn't retrieve all cars"}))
})

router.get('/:id', carsMiddleware.checkCarId ,(req,res)=> {
  res.status(200).json(req.car);
})

router.post('/', carsMiddleware.checkCarPayload, carsMiddleware.checkVinNumberValid, carsMiddleware.checkVinNumberUnique, (req, res) => {
    const { vin, make, model, mileage, title, transmission } = req.body;
    const car = { vin, make, model, mileage, title, transmission }
    carsDb.create(car)
    .then(car => {
        console.log(car);
        res.status(201).json(car)
    })
    .catch(err => {
        res.status(500).json({message: 'Could not create the car'})
    })
})


module.exports = router;